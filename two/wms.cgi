#!/bin/sh
export MS_MAPFILE=/www/openlayers/htdocs/${PATH_INFO}.map
exec /usr/lib/cgi-bin/mapserv
