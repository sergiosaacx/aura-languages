@echo off
echo ============================================
echo   Aura Languages — Instalacion WhisperX
echo ============================================
echo.

echo [1/3] Instalando yt-dlp...
pip install yt-dlp --quiet
echo    OK

echo [2/3] Instalando WhisperX...
pip install whisperx --quiet
echo    OK

echo [3/3] Verificando ffmpeg...
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo    ATENCION: ffmpeg no encontrado.
    echo    Descargalo de https://ffmpeg.org/download.html
    echo    y agrega la carpeta bin al PATH del sistema.
) else (
    echo    OK
)

echo.
echo ============================================
echo   Listo. Ahora puedes correr:
echo   cd tools
echo   python process_scene.py data/movies/incredibles-2/escena-1.json
echo ============================================
pause
