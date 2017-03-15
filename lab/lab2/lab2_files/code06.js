
    var gl;
    var shaderProgram;
    var draw_type=2;
var which_object = 1; 

  


//////////// Init OpenGL Context etc. ///////////////
    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            var background = new Image();
         background.src = 'image0.jpg';
          gl.drawImage(background, 0,0);

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

    var triangleVertexPositionBuffer;
    var triangleVertexColorBuffer;


    var circleVertexPositionBuffer;
    var circleVertexColorBuffer;

    var polygonVertexPositionBuffer;
    var polygonVertexColorBuffer;


   // var lineVertexPositionBuffer; 
    //var lineVertexColorBuffer; 

   ////////////////    Initialize VBO  ////////////////////////

    function initBuffers() {


        triangleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        var tri_vertices = [
        -1, -1, 0,
        1, -1, 0,
        0, 1, 0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tri_vertices), gl.STATIC_DRAW);
        triangleVertexPositionBuffer.itemSize = 3;
        triangleVertexPositionBuffer.numItems = 3;



        triangleVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
        var tri_colors = [
         1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tri_colors), gl.STATIC_DRAW);
        triangleVertexColorBuffer.itemSize = 4;
        triangleVertexColorBuffer.numItems = 3;

       
        
        var centerX = 0;
        var centerY  = 0;
        var radius = 1;
        var tri_num = 200;
        var twicePi = 2.0 * 3.1415926;
        var circle_vertices = [];
        var circle_colors = [];

         circleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);

        for(var i = 0; i < tri_num; i++)
        {
          circle_vertices.push(centerX +  radius * Math.cos(i * twicePi / tri_num));
          circle_vertices.push(centerY + radius * Math.sin(i * twicePi / tri_num));
          circle_vertices.push(0.0);
          if(i % 3 == 0)
          {
             circle_colors.push(1.0);
          circle_colors.push(0.0);
          circle_colors.push(0.0);
          circle_colors.push(1.0);
          }
          else
          {
            circle_colors.push(0.0);
          circle_colors.push(0.0);
          circle_colors.push(1.0);
          circle_colors.push(1.0);
          }

         
        }
        //console.log("circle_vertices.length" + circle_vertices.length);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circle_vertices), gl.STATIC_DRAW);
        circleVertexPositionBuffer.itemSize = 3;
        circleVertexPositionBuffer.numItems = tri_num;


         circleVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circle_colors), gl.STATIC_DRAW);
        circleVertexColorBuffer.itemSize = 4;
        circleVertexColorBuffer.numItems = tri_num;



          centerX = -.5;
        centerY  = -0.2;
       radius = .05;
        var edge_num = 10;
         var polygon_vertices = [];
        var   polygon_colors = [];

         polygonVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, polygonVertexPositionBuffer);

        for(var i = 0; i < edge_num; i++)
        {
          polygon_vertices.push(centerX +  radius * Math.cos(i * twicePi / edge_num));
          polygon_vertices.push(centerY + radius * Math.sin(i * twicePi / edge_num));
          polygon_vertices.push(0.0);
         // if(i % 3 == 0)
          {
             polygon_colors.push(1);
          polygon_colors.push(1);
          polygon_colors.push(0.0);
          polygon_colors.push(1.0);
          }
          // else
          // {
          //   polygon_colors.push(0.0);
          // polygon_colors.push(0.0);
          // polygon_colors.push(1.0);
          // polygon_colors.push(1.0);
          // }

         
        }
        //console.log("circle_vertices.length" + circle_vertices.length);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygon_vertices), gl.STATIC_DRAW);
        polygonVertexPositionBuffer.itemSize = 3;
        polygonVertexPositionBuffer.numItems = edge_num;


         polygonVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, polygonVertexColorBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygon_colors), gl.STATIC_DRAW);
        polygonVertexColorBuffer.itemSize = 4;
        polygonVertexColorBuffer.numItems = edge_num;
       // console.log("color" + circle_colors.length);
       // console.log("colorbuffer" + circlevertexColorBuffer.length);


        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

        vertices = [
             0.5,  0.5,  0.0,
		-0.5,  0.5,  0.0,
	        -0.5, -0.5,  0.0, 
             0.5, -0.5,  0.0,
        ];

	// l_vertices = [
 //             0.0,  0.0,  0.0,
	// 	0.7,  0.0,  0.0,
	//         0.0, 0.0,  0.0, 
 //            0.0, 0.7,  0.0,
 //        ];
	
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;

	// lineVertexPositionBuffer = gl.createBuffer();
 //        gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(l_vertices), gl.STATIC_DRAW);
 //        lineVertexPositionBuffer.itemSize = 3;
 //        lineVertexPositionBuffer.numItems = 4;

        squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        var colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 4;
        squareVertexColorBuffer.numItems = 4;


    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////


var mvMatrix1, mvMatrix2, mvMatrix3, mvMatrix4, mvMatrix5, mvMatrix6, mvMatrix7; 
    
    var Xtranslate = 0.0, Ytranslate = 0.0; 

    function setMatrixUniforms(matrix) {
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, matrix);
    }

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

///////////////////////////////////////////////////////

    var mvMatrixStack = [];

    function PushMatrix(matrix) {
        var copy = mat4.create();
        mat4.set(matrix, copy);
        mvMatrixStack.push(copy);
    }

    function PopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        var copy = mvMatrixStack.pop();
	return copy; 
    }


    function draw_polygon(matrix)
    {
       setMatrixUniforms(matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, polygonVertexPositionBuffer);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, polygonVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
         gl.bindBuffer(gl.ARRAY_BUFFER, polygonVertexColorBuffer);
         gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, polygonVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
         gl.drawArrays(gl.TRIANGLE_FAN, 0, polygonVertexPositionBuffer.numItems);
    }

    function draw_square(matrix) {

        setMatrixUniforms(matrix);	

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, squareVertexPositionBuffer.numItems);
	       
    }

    function draw_triangle(matrix)
    {
      setMatrixUniforms(matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
         gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
         gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
         gl.lineWidth(4.5);
         gl.drawArrays(gl.LINE_LOOP, 0, triangleVertexPositionBuffer.numItems);


    }
function draw_circle(matrix)
{
       setMatrixUniforms(matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, circleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

       gl.bindBuffer(gl.ARRAY_BUFFER, circleVertexColorBuffer);
       gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, circleVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, circleVertexPositionBuffer.numItems);

}


requestAnimationFrame(drawScene);
///////////////////////////////////////////////////////////////////////

    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        if(which_object == 4)
        {
            mvMatrix1 = mat4.rotate(mvMatrix1, -0.05 / Math.PI, [0,0,1]);
        mvMatrix2 = mat4.rotate(mvMatrix2, -0.05 / Math.PI, [0,0,1]);
        mvMatrix3 = mat4.rotate(mvMatrix3, 0.05 / Math.PI, [0,0,1]);
        }
      
	var Mstack = new Array(); 
        var model = mat4.create(); 
   mat4.identity(model);
     model = mat4.translate(model, [0, -0.1, 0]);
     model = mat4.multiply(model, mvMatrix1);
   for(var i = 0; i < 20; i++)
   {
     model = mat4.rotate(model, -1 / Math.PI, [0,0,1]);
     draw_polygon(model);
   }
  mat4.identity(model);
   //  model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   //  model = mat4.multiply(model, mvMatrix1);
   //   model = mat4.multiply(model, mvMatrix2);
   // for(var i = 0; i < 4; i++)
   // {
   //  model = mat4.translate(model,[0, -0.1, 0]);//left circle

   //  draw_polygon(model);
   // }
   //    model = mat4.translate(model,[1, .4, 0]);

   //  for(var i = 0; i < 4; i++)
   // {
   //    model = mat4.translate(model,[0, -0.1, 0]);
   //    draw_polygon(model);
   // }
   // mat4.identity(model);

     model = mat4.multiply(model, mvMatrix1); // 1,base
      model = mat4.scale(model, [0.8, 0.2, 0.1]); 
   model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [0,-3.35,0]);
       draw_square(model); 
      

    mat4.identity(model);
     model = mat4.multiply(model, mvMatrix1);
  model = mat4.scale(model, [0.1, 0.4, 0.1]); 
   model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [0,-0.425,0]);
    //2, triangle_center
       draw_triangle(model);

 mat4.identity(model);
 
    model = mat4.multiply(model, mvMatrix1);
   
      model = mat4.scale(model, [1.2, 0.05, 0.05]); 
   model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [0,5,0]);
       draw_square(model);

  mat4.identity(model);
    model = mat4.multiply(model, mvMatrix1);
  model = mat4.scale(model, [0.2, 0.25, 0.1]);
    model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [2.5,-0.1,0]);
  
    // model = mat4.multiply(model, mvMatrix2);
     model = mat4.multiply(model, mvMatrix3);
     //model = mat4.multiply(model, mvMatrix4); //4, triangle_right
       draw_triangle(model);


 mat4.identity(model);
    model = mat4.multiply(model, mvMatrix1);
  model = mat4.scale(model, [0.2, 0.25, 0.1]); 
    model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [-2.5,-0.1,0]);//triangle_left
     model = mat4.multiply(model, mvMatrix2);
       draw_triangle(model);
  

	mat4.identity(model);
	
    model = mat4.multiply(model, mvMatrix1);
    model = mat4.scale(model, [0.1, 0.1, 0.1]); 
   model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [5,-1.5,0]);//circle_righ
   model = mat4.rotate(model, Math.PI, [0,0,1]);
     model = mat4.multiply(model, mvMatrix3);
	     draw_circle(model);

  mat4.identity(model);
 
    model = mat4.multiply(model, mvMatrix1);
      model = mat4.scale(model, [0.1, 0.1, 0.1]); 
   model = mat4.scale(model, [0.5, 0.5, 0.5]); 
   model = mat4.translate(model, [-5,-1.5,0]);//circle_left
     model = mat4.multiply(model, mvMatrix2);
       draw_circle(model);
      if(which_object == 4)
          requestAnimationFrame(drawScene);
    }


    ///////////////////////////////////////////////////////////////

    var lastMouseX = 0, lastMouseY = 0;


    ///////////////////////////////////////////////////////////////

     function onDocumentMouseDown( event ) {
          event.preventDefault();
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.addEventListener( 'mouseup', onDocumentMouseUp, false );
          document.addEventListener( 'mouseout', onDocumentMouseOut, false );
          var mouseX = event.clientX;
          var mouseY = event.clientY;

          lastMouseX = mouseX;
          lastMouseY = mouseY; 

      }

     function onDocumentMouseMove( event ) {
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;
          var diffY = mouseY - lastMouseY;

	// console.log("rotate"+degToRad(diffX/5.0));
	 if (which_object == 1) 
	     mvMatrix1 = mat4.rotate(mvMatrix1, degToRad(diffX/4.0), [0, 1, 0]);
	 if (which_object == 2)  {
	     mvMatrix2 = mat4.rotate(mvMatrix2, degToRad(diffX/2.0), [0, 1, 0]);
	     //mvMatrix4 = mat4.rotate(mvMatrix4, degToRad(-1*diffX/5.0), [0, 0, 1]);	     
	 }
	 if (which_object == 3)  {
	     mvMatrix3 = mat4.rotate(mvMatrix3, degToRad(diffX/2.0), [0, 1, 0]);
	   //  mvMatrix5 = mat4.rotate(mvMatrix5, -1*degToRad(diffX/5.0), [0, 0, 1]);	     
	 }
  
   // console.log("object" + which_object);
   // if(which_object == 4)
   // {
   //  mvMatrix4 = mat4.rotate(mvMatrix4, degToRad(diffX / 5.0), [0,0,1]);
   //  mvMatrix6 = mat4.rotate(mvMatrix6, degToRad(diffX / 5.0), [0,0,1]);
   //  mvMatrix5 = mat4.rotate(mvMatrix5, -1 * degToRad(diffX / 5.0), [0,0,1]);
   //  mvMatrix7 = mat4.rotate(mvMatrix7, -1* degToRad(diffX / 5.0), [0,0,1]);

   // }
	 
          lastMouseX = mouseX;
          lastMouseY = mouseY;

          drawScene();
     }

     function onDocumentMouseUp( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

     function onDocumentMouseOut( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }


    function onKeyDown(event) {

      console.log(event.keyCode);
      switch(event.keyCode)  {
         case 76:
             {
                mvMatrix1 = mat4.translate(mvMatrix1, [-0.1, 0, 0]);   

             }
		      		      
         break;
         case 82:    
		      mvMatrix1 = mat4.translate(mvMatrix1, [0.1, 0.0, 0]);		  		      
          break;
         case 83:
              if (event.shiftKey) {
                  console.log('enter S');
                    mvMatrix1 = mat4.scale(mvMatrix1, [1.05, 1.05, 1.05]);  
                }
		
		    
              else {
		  console.log('enter s');
		 
		      mvMatrix1 = mat4.scale(mvMatrix1, [0.95, 0.95, 0.95]);	
          }	  		  		  		      
		
              break; 
        case 70:
           mvMatrix1 = mat4.translate(mvMatrix1, [0, 0.1, 0]);  
           break;
           case 66:
            mvMatrix1 = mat4.translate(mvMatrix1, [0, -0.1, 0]);  
           break;


       }
       drawScene();
    }
    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code04-canvas");
        initGL(canvas);
        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);


        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.whatever = 4;
	shaderProgram.whatever2 = 3; 


        initBuffers(); 

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

	document.addEventListener('mousedown', onDocumentMouseDown,false);
	document.addEventListener('keydown', onKeyDown, false);

	mvMatrix1 = mat4.create(); 
	mat4.identity(mvMatrix1);

	mvMatrix2 = mat4.create(); 
        mat4.identity(mvMatrix2);

	mvMatrix3 = mat4.create(); 
        mat4.identity(mvMatrix3);


        drawScene();
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {

    mat4.identity(mvMatrix1);
    mat4.identity(mvMatrix2);
    mat4.identity(mvMatrix3);
  
    drawScene();
}

function obj(object_id) {


    which_object = object_id;
    console.log("obj" + which_object);
    if(which_object == 0)
        redraw();
    else
    drawScene();


} 
