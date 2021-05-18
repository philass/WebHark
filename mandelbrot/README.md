In order to run this you will need to launch a simple web server.

First compile the futhark to a wasm library with
```
futhark wasm --lib mandelbrot.fut
```
Then launch a simple web server
```
python3 http.server 8008
```
Then open `http://localhost:8008/mandelbrot.html` and try it out. 
![gif example](../demos/mandelbrot.gif)

