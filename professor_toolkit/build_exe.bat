@echo off
REM Build professor_toolkit into a standalone Windows executable using PyInstaller

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Building executable...
pyinstaller --onefile --name professor_toolkit --add-data "config.json;." main.py

echo.
if exist dist\professor_toolkit.exe (
    echo Build successful! Executable: dist\professor_toolkit.exe
) else (
    echo Build failed. Check the output above for errors.
    exit /b 1
)
