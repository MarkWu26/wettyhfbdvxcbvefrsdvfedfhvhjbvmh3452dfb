# wettyhfbdvxcbvefrsdvfedfhvhjbvmh3452dfb

STEP 1: go to backend folder of my git repository

STEP 2: go to db folder

STEP 3: download the new SQL FILE which is the latest_11_19_23.sql (this is the new updated database that i have made changes)

STEP 4: OPEN XAMPP

STEP 5: click start on APACHE and mySQL, (they should be running now)

STEP 6: go to localhost/phpmyadmin (type the whole url in browser, do not copy or shortcut)

STEP 7: click on the 'Chart' database on the left panel (the one we created yesterday)

STEP 8: tick (check) the CHECK ALL checkbox button

STEP 9: click the 'With selected dropdown'

STEP 10: select the 'drop' option (we are droping your existing database, because i have made new changes to the database, so now we will be importing the new database which is the latest_11_19_23.sql

STEP 11: after dropping, make sure that you are still on the chart database, then click IMPORT in the menu above

STEP 12: locate the new database file which is the one that you downloaded latest_11_19_23.sql, then click import

your database should be updated at this point*

** Next is opening the frontend **

before going on,

open up your vs code project containing the files that you had yesterday the one we tried to install make sure its the same folder

STEP 13: open vs code

forgot to include this, please do this before proceeding to step 14 (too tired to rename the steps) **

step 13.1: In the terminal below in vs code, choose Git bash. If you cant see your terminal you can type crtl + ` (control plus backtick in your keyboard to open terminal)

note you should be on the path something like *C:\Users\63916\Desktop\clearitt* //depends on the path of your project folder

step 13.2: type 'git pull origin main' this is to pull the updated changes from my repository, then hit enter

it should display like a success message or saying that it is already up to date

step 13.3: click the delete icon to close the Git bash terminal,

proceed now to step 14

step 14: in the terminal below in vs code, choose Split terminal (POWERSHELL). If you cant see your terminal you can type crtl + ` (control plus backtick in your keyboard to open terminal)

note you should be on the path something like ** C:\Users\63916\Desktop\clearitt**

you should be seeing two terminals splitted now

step 15: in the first terminal or left terminal panel, type 'cd frontend', then click enter

step 16: type 'cd xero', click enter

step 16: type 'npm install', click enter (this is to install packages)

step 17: type 'npm run dev' to start running the frontend. You can access the frontend through localhost:5173 or u can see the url provied in the terminal when running 'npm run dev'

** starting the backend **

make sure that your xampp's apache and mysql are still running

step 18: on the second terminal (right terminal), type 'cd backend', enter

step 19: type 'npm install', enter

if there is a warning or error its okay,

step 20: type 'npm install prisma', enter

step 21: type: 'npx prisma db pull', enter

step 22: type: 'npx prisma generate', enter

step 23: type 'npm start' , enter

and youre good to go if you can see this: 'Your Xero OAuth2 app is running at http://localhost:5000' in the backend terminal

if you want to abort terminal or stop

hit control + c if you want to abort or stop the terminal from running *
