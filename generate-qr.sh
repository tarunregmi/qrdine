#!/bin/bash

# extract ip address
ip=$(hostname -I | awk '{print $1}')

# construct base url with prefix
prefix="http://$ip:4200/#/menu?table="

# table ids
ids=(
  'a6kuvu7voi6ymg3'
  'uhiy02ydouuaogb'
  'tt89oe4qlxnp4pj'
  'oxkms3dtx9php6k'
  'ow6q2th9gv2f5zm'
  '216qmvlyhteixps'
  'skfix6ermt42k23'
)

index=1

for id in "${ids[@]}"; do
  # construct the full URL using the prefix variable
  url="$prefix$id"

  # construct the output filename with ID suffix
  output_file="T${index}.png"

  # Generate the QR code using qrencode
  qrencode -s 9 -l H -o "./qr/$output_file" "$url"

  # increment the index counter
  index=$((index + 1))
done
