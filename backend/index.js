'use strict';
import metricsRoute from './routes/metricsRoute.js'
import userRoute from './routes/userRoute.js'
import reportsRoute from './routes/reportsRoute.js'
import express from 'express';
import session from 'express-session'
import request from 'request';
import cors from 'cors';
import {Issuer} from 'openid-client'
import config from './config.json' assert { type: 'json' };
import {dirname} from 'path'
import { fileURLToPath } from 'url';


const client_id = config.CLIENT_ID;
const client_secret = config.CLIENT_SECRET;
const redirectUrl = config.REDIRECT_URL
const scopes = config.SCOPES;

/* export var result */

(async () => {
    var inMemoryToken;

    let app = express()
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));

    const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

    app.set('port', (5000))
    app.use(express.static(__dirname + '/public'))
    app.use(session({
        secret: 'something crazy',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    app.use(express.json())

    const issuer = await Issuer.discover('https://identity.xero.com');  //The one URL which allows the app to discover all the other URLs for OAuth  

    const client = new issuer.Client({
        client_id: client_id,
        client_secret: client_secret
    }); 
   /*  app.use('/reports', reportsRoute) */
    app.use('/metrics', metricsRoute);
    app.use('/user', userRoute )
  /*   app.use('/reports', reportsRoute) */

    app.get('/', function (req, res) {
        // builds URL to send request to accessTokenUri with query params:
        //      response_type=code  (see below, using the code object's method .getUri -> oauth2.code.getUri() defines the requested grant type as a code grant type)
        //      client_id
        //      redirect_uri
        //      scopes
        //      state 
        // All of these parameters will be validated by the authorization server.
        let consentUrl = client.authorizationUrl({
            redirect_uri: redirectUrl,
            scope: scopes,
        }); 
        res.json({xeroUrl: consentUrl})
    })

    


    app.get('/callback', async function (req, res) {
        // If the user approves they will be redirected from the 
        // authorisation server back to the redirect URI with these query params:
        //     code - the authorization code
        //     state - the state parameter sent in the original request.

        try {
            client.CLOCK_TOLERANCE = 5; // to allow a 5 second skew, this helps prevent errors thrown by openid-client server clock validations
            Issuer.defaultHttpOptions = {};
            //POST request to the authorization server with the following parameters:
            //     grant_type - 'authorization_code' 
            //     client_id
            //     client_secret
            //     redirect_uri
            //     code - the authorization code from the query string in req.url
            const token = await client.authorizationCallback(redirectUrl, req.query) 
            // The authorization server will respond with a JSON object containing:
            //     token_type  “Bearer”
            //     expires_in 
            //     id_token
            //     access_token
            //     refresh_token - can be used to acquire a new access token when the original expires

            if(token){
                inMemoryToken = token                   //this is an in memory object holding the actual tokens            
                let accessToken = token.access_token     //this is a JWT (JSON Web Token)
                req.session.accessToken = accessToken
                console.log('\nOAuth successful...\n\naccess token: \n' + accessToken + '\n')
                let idToken = token.id_token
                console.log('\id token: \n' + idToken + '\n')
                console.log('\nid token claims: \n' + JSON.stringify(token.claims, null, 2));
                let refreshToken = token.refresh_token
                console.log('\nrefresh token: \n' + refreshToken)
                req.session.save()
    
                //GET CONNECTED TENANTS
    
                var connectionsRequestOptions = {
                    url: 'https://api.xero.com/connections',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    auth: {
                        'bearer': req.session.accessToken
                    },
                    
                }
    
                //get list of authorized tenant connections
                request.get(connectionsRequestOptions, function (error, response, body) {
                    if (error) {
                        console.log('error from conenctionsRequest: ' + error)
                    }
                    let data = JSON.parse(body)
                    let tenant = data[0]    //grab the first connection 
                    let tenantId = tenant['tenantId']
                    req.session.xeroTenantId = tenantId
                    console.log('\nRetrieving connections...\n\ntenantId: \n' + tenantId)
                    req.session.save(()=>{
                        res.redirect('http://localhost:5173/data-manager')
                    })

                    var executiveReportsOptions = {
                        url: 'https://api.xero.com/api.xro/2.0/Reports/ExecutiveSummary',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'xero-tenant-id': req.session.xeroTenantId
                        },
                        auth: {
                            'bearer': req.session.accessToken
                        }
                    }
            
                    request.get(executiveReportsOptions, function (error, response, body) {
                        if (error) {
                            console.log('error from executiveReports: ' + error)
                        }
            
                          /* result = body */
                        console.log('body: ' + body)
                        
                    })
                   
                })
    
               
            }else{
                console.log('No valid token received in the callback.');
                // Handle the case where the token is not valid or not received
                res.status(500).send('Internal Server Error');
            }
        } catch (e) {
            console.log('ERROR: ' + e)
        }

    })

    app.get('/getAuth',  function (req, res) {
       console.log('trying to send')
        res.status(200).json({token: req.session.accessToken, id: req.session.xeroTenantId})
       console.log({token: req.session.accessToken, id: req.session.xeroTenantId})
    })


    app.get('/home', function (req, res) {
        res.send(`<br><a href="/getOrganisation">Get Xero Organisation</a><br><br><a href="/getInvoices">Get Xero Invoices</a><br><br><a href="/refreshToken">Refresh Xero Access Token</a>`)
    })

    app.get('/reports', async function (req, res) {
        var executiveReportsOptions = {
            url: 'https://api.xero.com/api.xro/2.0/Reports/ExecutiveSummary',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xero-tenant-id': req.session.xeroTenantId
            },
            auth: {
                'bearer': req.session.accessToken
            }
        }

        request.get(executiveReportsOptions, function (error, response, body) {
            if (error) {
                console.log('error from executiveReports: ' + error)
            }

            console.log('body: ' + body)
            res.status(200).json({body})
        })
    })

    app.get('/balance', async function (req, res) {
        var balanceOptions = {
            url: 'https://api.xero.com/api.xro/2.0/Reports/BalanceSheet',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xero-tenant-id': req.session.xeroTenantId
            },
            auth: {
                'bearer': req.session.accessToken
            }
        }

        request.get(balanceOptions, function (error, response, body) {
            if (error) {
                console.log('error from balance reports: ' + error)
            }

            console.log('body: ' + body)
            res.status(200).json({body})
        })
    })



    app.get('/getOrganisation', async function (req, res) {
        var organisationRequestOptions = {
            url: 'https://api.xero.com/api.xro/2.0/organisation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xero-tenant-id': req.session.xeroTenantId
            },
            auth: {
                'bearer': req.session.accessToken
            }
        }

        request.get(organisationRequestOptions, function (error, response, body) {
            if (error) {
                console.log('error from organisationRequest: ' + error)
            }
            console.log('body: ' + body)
            res.redirect('/home')
        })
    })

    app.get('/grossProfitMargin', async function (req, res) {
        var gpmOptions = {
            url: 'https://api.xero.com/api.xro/2.0/reports/ExecutiveSummary',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xero-tenant-id': req.session.xeroTenantId
            },
            auth: {
                'bearer': req.session.accessToken
            }
        }

        request.get(gpmOptions, function (error, response, body) {
            if (error) {
                console.log('error from gross profit margin request: ' + error)
            }

            

            console.log('body: ' + body + ', response is: ', response)
            res.json({data: body, id: req.session.xeroTenantId, token: req.session.accessToken})
        } )
    })

    app.get('/getInvoices', async function (req, res) {
        var invoicesRequestOptions = {
            url: 'https://api.xero.com/api.xro/2.0/invoices',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xero-tenant-id': req.session.xeroTenantId
            },
            auth: {
                'bearer': req.session.accessToken
            }
        }

        request.get(invoicesRequestOptions, function (error, response, body) {
            if (error) {
                console.log('error from invoicesRequest: ' + error)
            }

            console.log('body: ' + body)
            res.redirect('/home')
        })
    })

    app.get('/refreshToken', async function (req, res) {
        try {
            client.CLOCK_TOLERANCE = 5; // to allow a 5 second skew
            Issuer.defaultHttpOptions = {};
            let newToken = await client.refresh(inMemoryToken.refresh_token);       //use in memory client object to refresh token
            req.session.accessToken = newToken.access_token      //this makes request to accessTokenUri
            req.session.save()                                  //with header -> grant_type: refresh_token
            inMemoryToken = newToken
            console.log('\nRefresh successful...\n\nnew access token: \n' + newToken.access_token + '\n')
            console.log('new refresh token: \n' + newToken.refresh_token)
        } catch (e) {
            console.log('refreshToken error: ' + e)
        } finally {
            res.redirect('/home')
        }
    })

    app.listen(app.get('port'), function () {
        console.log("Your Xero OAuth2 app is running at http://localhost:" + app.get('port'))
    });
})();
