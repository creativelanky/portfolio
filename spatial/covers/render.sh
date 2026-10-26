#!/bin/sh
# Renders each cover in compose.html to a 1600x1000 JPG with headless Chrome.
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for c in lumoswap oaksjet terrace dreamspace washpadi glitch-market; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1600,1000 \
    --screenshot="$c.png" "file://$PWD/compose.html?c=$c" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 86 "$c.png" --out "$c.jpg" >/dev/null && rm "$c.png"
done
