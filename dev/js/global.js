window.nombreproyecto = {};

nombreproyecto.W = window;
nombreproyecto.D = document;
nombreproyecto.E = nombreproyecto.D.documentElement;
nombreproyecto.G = nombreproyecto.D.getElementsByTagName('body')[0];
nombreproyecto.X = nombreproyecto.W.innerWidth || nombreproyecto.E.clientWidth || nombreproyecto.G.clientWidth;
nombreproyecto.Y = nombreproyecto.W.innerHeight || nombreproyecto.E.clientHeight || nombreproyecto.G.clientHeight;

nombreproyecto.paths = {
  dev: '',
  dist: ''
};


