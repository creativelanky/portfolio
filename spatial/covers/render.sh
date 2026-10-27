#!/bin/sh
# Renders every cover in compose.html with headless Chrome:
#   wide 1600x1000 -> covers/<slug>.jpg
#   card 1000x1000 -> covers/card/<slug>.jpg
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p card
shot(){ # slug variant width height out
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size="$3,$4" \
    --screenshot="$5.png" "file://$PWD/compose.html?c=$1&v=$2" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 86 "$5.png" --out "$5.jpg" >/dev/null && rm "$5.png"
}
for c in lumoswap oaksjet terrace dreamspace washpadi glitch-market; do
  shot "$c" wide 1600 1000 "$c"
  shot "$c" card 1000 1000 "card/$c"
done
