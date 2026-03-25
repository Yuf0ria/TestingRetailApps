@echo off
cls
cd /d %~dp0

echo ===============================
echo RUNNING AUTOMATION TEST SUITE
echo ===============================

call :run "Authentication" Authentication.js
call :run "Product" ProductTesting.js
call :run "Cart" CartTesting.js
call :run "Checkout" CheckoutTesting.js
call :run "Contact Us" ContactUs.js
call :run "Admin" AdminTesting.js

echo.
echo ALL TESTS COMPLETED SUCCESSFULLY
goto :end

:run
echo.
echo Running %1 Tests...
node %2
if %errorlevel% neq 0 (
    echo  %1 Tests FAILED
    goto :error
)
echo  %1 Tests PASSED
exit /b

:error
echo.
echo  TEST SUITE STOPPED
goto :end

:end
pause