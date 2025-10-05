gdal raster tile new_image.jpg --tiling-scheme raster --progress --min-zoom 1 --max-zoom 14 tiles_output
aws s3 sync tiles_output s3://your-bucket-name/tiles_output --delete --acl public-read