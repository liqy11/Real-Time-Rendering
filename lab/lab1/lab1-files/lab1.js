
    var gl;
    var shaderProgram;
    var draw_type=2;
    var ctx;
    var kind = -1;
//////////// Init OpenGL Context etc. ///////////////

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var squareVertexPositionBuffer;
    var squareVertexColorBuffer;
    var squareVertexIndexBuffer;
    var lineVertexPositionBuffer;
    var lineVertexColorBuffer;


    var vertices = []; 
    var indices = [];
    var num_vertices; 
    var num_indices;

    function createBarVertices(avgs) {
    vertices.length = 0;
    indices.length = 0;
	var num_bars = avgs.length;
	num_vertices = num_bars * 4;
	num_indices = num_bars * 6;

	var min, max;
	var width; 
	min = Number(avgs[0]);  max = Number(avgs[0]); 
       // find min and max 
	for (var i=0; i<num_bars; i++) {
	    console.log( "val = " + avgs[i]); 
	    if (Number(avgs[i]) < min) min = Number(avgs[i]);
	    if (Number(avgs[i]) > max) max = Number(avgs[i]); 
	} 
	width = max-min; 
    console.log("min = "+min+" max = "+max);
	
	var v_margin, h;
    {
        v_margin = 0.4; 
        h = 3/(5*num_bars+1); 

    }
    console.log("num_bars" + num_bars);
	for (var i =0; i<num_bars; i++) {

        vertices.push(-1+(3*i+1)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
	    vertices.push(-1+(3*i+3)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
	    vertices.push(-1+(3*i+3)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs[i]-min)/width); vertices.push(0.0);
	    vertices.push(-1+(3*i+1)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs[i]-min)/width); vertices.push(0.0);
	    
	    indices.push(0+4*i);  indices.push(1+4*i);  indices.push(2+4*i);
	    indices.push(0+4*i);  indices.push(2+4*i);  indices.push(3+4*i); 	    
	}


        initBuffers(); 

        drawScene();

	
    } 

   ////////////////    Initialize VBO  ////////////////////////

    function initBuffers() {
	
        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = num_vertices;

	squareVertexIndexBuffer = gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
        squareVertexIndexBuffer.itemsize = 1;
        squareVertexIndexBuffer.numItems = num_indices; 

        squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        var colors = [];
       if(kind == 0)
        {
           colors = [];
              for(var i = 0; i < num_vertices; i++)
              {
                 colors.push(0.30);
                colors.push(0.71);
                colors.push(0.96);
                colors.push(1.0);
              }
             
        }
       if(kind == 1)
        {
            colors = [];
              for(var i = 0; i < num_vertices; i++)
              {
                 colors.push(0.98);
                colors.push(0.40);
                colors.push(0.26);
                colors.push(1.0);
              }

               // colors.concat([0.0,1.0,0.0,1.0]);
        }
        if(kind == 2)
        {
            colors = [];
             for(var i = 0; i < num_vertices; i++)
             {
                colors.push(0.525);
                colors.push(0.674);
                colors.push(0.254);
                colors.push(1.0);
             }     
        }
        if(kind == 3)
        {
            console.log("kind" + kind);
            colors = [];
            for(var j = 0; j < 3; j++)
            {
                  for(var i = 0; i < 4; i++)
               {
                 colors.push(1.0);
                colors.push(1.0);
                colors.push(1.0);
                colors.push(1.0);
               }          
                for(var i = 0; i < 4; i++)
                {
                     colors.push(0.39);
                    colors.push(0.58);
                    colors.push(0.93);
                    colors.push(1.0);
                }
                 for(var i = 0; i < 4; i++)
                 {
                     colors.push(0.486);
                colors.push(0.667);
                colors.push(0.176);
                colors.push(1.0);
                 }
                for(var i = 0; i < 4; i++)
                {
                    colors.push(0.929);
                colors.push(0.341);
                colors.push(0.321);
                colors.push(1.0);   
                }
                  for(var i = 0; i < 4; i++)
                  {
                      colors.push(0.945);
                colors.push(0.552);
                colors.push(0.62);
                colors.push(1.0);
                  }
             
            }
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 4;
        squareVertexColorBuffer.numItems = colors.length / 4;

        var l_vertices = [
         -0.9,  -0.6,  0.0,
         0.8,  -0.6,  0.0,
         -0.9,  -0.5,  0.0,
         0.8,  -0.5,  0.0,
         -0.9,  -0.4,  0.0,
         0.8,  -0.4,  0.0,
         -0.9,  -0.3,  0.0,
         0.8,  -0.3,  0.0,
         -0.9,  -0.2,  0.0,
         0.8,  -0.2,  0.0,
         -0.9,  -0.1,  0.0,
         0.8,  -0.1,  0.0,
         -0.9,  0.0,  0.0,
         0.8,   0.0,  0.0,
         -0.9,  0.1,  0.0,
         0.8,   0.1,  0.0,
         -0.9,  0.2,  0.0,
         0.8,   0.2,  0.0,
         -0.9,  0.3,  0.0,
         0.8,   0.3,  0.0,
         -0.9,  0.4,  0.0,
         0.8,   0.4,  0.0,
          -0.9,  0.5,  0.0,
         0.8,   0.5,  0.0,
          -0.9,  0.6,  0.0,
         0.8,   0.6,  0.0,
          -0.9,  0.7,  0.0,
         0.8,   0.7,  0.0,
         -0.9, 0.7, 0.0,
         -0.9, -0.6, 0.0,
         0.8, 0.7, 0.0,
         0.8, -0.6, 0.0,
         ];

    
    lineVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(l_vertices), gl.STATIC_DRAW);
    lineVertexPositionBuffer.itemSize = 3;
    lineVertexPositionBuffer.numItems = l_vertices.length / 3;

      var line_colors = [];
    for(var i = 0; i < l_vertices.length / 3; i++)
    {
        line_colors.push(0.39);
        line_colors.push(0.58);
        line_colors.push(0.93);
        line_colors.push(1.0);

    }


    lineVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(line_colors), gl.STATIC_DRAW);
    lineVertexColorBuffer.itemSize = 4;
    lineVertexColorBuffer.numItems = line_colors.length / 4;
    }


///////////////////////////////////////////////////////////////////////

    function drawScene() {

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        

	// draw elementary arrays - triangle indices 
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

	   gl.drawElements(gl.TRIANGLES, num_indices, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, lineVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, lineVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.LINES, 0, lineVertexPositionBuffer.numItems);
      
        
        ctx.clearRect(0, 0,  canvas.width, canvas.height);
        ctx.font = "20px serif";
        ctx.fillStyle = "474747";
        if(kind == 0)
             ctx.fillText("Setossa",50,140);
        if(kind == 1)
            ctx.fillText("Versicolor",50,140);
        if(kind == 2)
            ctx.fillText("Virginica",50,140);
        if(kind == 3)
        {
        ctx.fillText("Setossa",80,580);
        ctx.fillText("Versicolor", 280,580);
        ctx.fillText("Virginica", 480,580);
        ctx.font = "10px serif";
        ctx.fillText("sepal length",50, 230);
        ctx.fillText("sepal width", 90, 330);
        ctx.fillText("petal length", 135, 450);
        ctx.fillText("petal width", 180, 535);
        }
	
    }


    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        canvas = document.getElementById("code05-canvas");
        var text_canvas = document.getElementById("text");
        ctx = text_canvas.getContext("2d");     
        initGL(canvas);

        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
       gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 


function redraw() {
    drawScene();
}


function geometry(type) {

    draw_type = type;
    drawScene();

} 
