//Geogebra Implementation
var ggbApp = new GGBApplet({"appName": "graphing", "width": 800, "height": 600, "showToolBar": true, "showAlgebraInput": true, "showMenuBar": true }, true);
window.addEventListener("load", function() {
    ggbApp.setHTML5Codebase('GeoGebra/HTML5/5.0/web3d/');
    ggbApp.inject('ggb-element');
});




//main
var a, b, c, d, e, f;
function getData() {
    document.getElementById("matrix").innerHTML = " ";
    document.getElementById("tipo_sol").innerHTML = " ";
    document.getElementById("sol").innerHTML = " ";
    a = document.getElementById("a").value;
    b = document.getElementById("b").value;
    c = document.getElementById("c").value;
    d = document.getElementById("d").value;
    e = document.getElementById("e").value;
    f = document.getElementById("f").value;
    a = Number(a);
    b = Number(b);
    c = Number(c);
    d = Number(d);
    e = Number(e);
    f = Number(f);
    procedimiento();
    cambiarTab();
    
}
function cambiarTab() {
    document.getElementById("tab1").className = "mdl-layout__tab";
    document.getElementById("fixed-tab-1").className = "mdl-layout__tab-panel";
    document.getElementById("tab2").className = "mdl-layout__tab is-active";
    document.getElementById("fixed-tab-2").className = "mdl-layout__tab-panel is-active";
}
function procedimiento() {
    aux1 = a;
    aux2 = d;
    a2 = a;
    b2 = b;
    c2 = c;
    d2 = d;
    e2= e;
    f2= f;
    operacionGauss();
    document.getElementById("matrix").innerHTML = "A* = <br> | " + a +" "+ b + " " + c + " | <br>" +
                                                  "     | "+ d +" "+ e + " " + f + " | <br>";

    resolverSistema();
}

function multiplicarFilas(){
    //Fila 1
    a2 *= aux2;
    b2 *= aux2;
    c2 *= aux2;
    //Fila 2
    d *= aux1;
    e *= aux1;
    f *= aux1;
}

function restaDeFilas(){
    d -= a2;
    e -= b2;
    f -= c2;
}

function operacionGauss(){
    multiplicarFilas();
    restaDeFilas();
}
function resolverSistema(){
    solucion = reconResultado();
    if(solucion == 3){
        y = f/e;
        x = (c - (b*y))/ a;
        document.getElementById("tipo_sol").innerHTML = "Solución única";
        document.getElementById("sol").innerHTML = "La solucion del sistema es: <br> x = "+x+" <br>y= "+y+" <br>";
        ggbApplet.evalCommand(a+"x+("+b+"y)="+c);
        ggbApplet.evalCommand(d2+"x+("+e2+"y)="+f2);
        ggbApplet.evalCommand("("+x+", "+y+")");
    }
    if(solucion == 2){
        document.getElementById("tipo_sol").innerHTML = "No tiene solución <br>";
        ggbApplet.evalCommand(a+"x+("+b+"y)="+c);
        ggbApplet.evalCommand(d2+"x+("+e2+"y)="+f2);
    }
    if(solucion == 1){
        document.getElementById("tipo_sol").innerHTML = "Infinidad de soluciones <br>";
        ggbApplet.evalCommand(a+"x+("+b+"y)="+c);
        ggbApplet.evalCommand(d2+"x+("+e2+"y)="+f2);

    }
}
function reconResultado(){
    if(e == 0 && f == 0){
        return 1;
    }
    else if (e == 0 && f != 0){
        return 2;
    }
    else if ( e != 0 && f != 0){
        return 3;
    }
}


