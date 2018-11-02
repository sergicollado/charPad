## generate html from pdf

``` bash
docker run -ti -v pdfsFolder:/pdf klokoy/pdf2htmlex
root@9e049c3a41cf:/pdf# pdf2htmlEX --embed-javascript 0 --zoom 1.5 Ficha\ Fragil.pdf  fragil.html
```
