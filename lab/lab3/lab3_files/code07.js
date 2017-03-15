
//////////////////////////////////////////////////////////////////
//
//  This example is similar to code03.html, but I am showing you how to
//  use gl elemenntary array, i.e, triangle indices, to draw faces 
//

var gl;
var shaderProgram;
var draw_type=2; 
var diffX_camera = 0, diffY_camera = 0;
var diffX_COI = 0, diffY_COI = 0;
var scale = 1;
 var x_up = 0, y_up = 1;
 var rotate_angle = 0;
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

    var CylinderVertexPositionBuffer;
    var CylinderVertexColorBuffer;
    var CylinderVertexIndexBuffer;

    var SphereVertexPositionBuffer;
    var SphereVertexIndexBuffer;
    var SphereVertexColorBuffer;



   ////////////////    Initialize VBO  ////////////////////////

    function Cylinder(base_radius, top_radius,height, slice_number, stack_number, color)
    {
        CylinderVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexPositionBuffer);
        var cylinder_vertices = [];
        var cylinder_colors = [];
        var cylinder_indices = [];
           for(var stack = 0; stack <= stack_number; stack++)
          {
            for(var slice = 0; slice <= slice_number; slice++)
            {
              var Theta = slice * Math.PI * 2 / slice_number;
              var sinTheta = Math.sin(Theta);
              var cosTheta = Math.cos(Theta);
           
                var h = stack * height / stack_number;
                var radius = base_radius * h/ height+ top_radius*(1-h/height) ;
                var x = cosTheta * radius;
                var z = sinTheta * radius;
                var y = h;
                cylinder_vertices.push(x);
                cylinder_vertices.push(y);
                cylinder_vertices.push(z);
              //  if(slice %3 == 1 || slice %3 == 2)
                {
                    cylinder_colors.push(color[0]);
                cylinder_colors.push(color[1]);
                cylinder_colors.push(color[2]);
                }
                // else
                // {
                //     cylinder_colors.push(1);
                // cylinder_colors.push(1);
                // cylinder_colors.push(1);
                // }
              
                cylinder_colors.push(1.0);
          }
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinder_vertices),gl.STATIC_DRAW);
        CylinderVertexPositionBuffer.itemSize = 3;
        CylinderVertexPositionBuffer.numItems = (slice_number + 1) * (stack_number + 1);
        CylinderVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinder_colors), gl.STATIC_DRAW);
        CylinderVertexColorBuffer.itemSize = 4;
        CylinderVertexColorBuffer.numItems = (stack_number +1) * (slice_number + 1);

        CylinderVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CylinderVertexIndexBuffer);
          for (var stack = 0; stack < stack_number; stack++) {
            for (var slice = 0; slice < slice_number; slice++) {
              var first = stack * (slice_number  + 1)+ slice;
              var second = first + slice_number + 1;
              cylinder_indices.push(first);
              cylinder_indices.push(second);
              cylinder_indices.push(first + 1);
              cylinder_indices.push(second);
              cylinder_indices.push(second + 1);
              cylinder_indices.push(first + 1);
      }
    }
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cylinder_indices), gl.STATIC_DRAW);
    CylinderVertexIndexBuffer.itemSize = 1;
    CylinderVertexIndexBuffer.numItems =  6 *slice_number* stack_number;



    }
    function Sphere(radius, lati_num, longi_num, color)
    {
      SphereVertexPositionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, SphereVertexPositionBuffer);
      var sphere_vertices = [];
      var sphere_colors = [];
      for(var la = 0; la <= lati_num; la++)
      {
        var theta = la * Math.PI / lati_num;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        for(var lo = 0; lo <= longi_num; lo++)
        {
          var phi = lo * Math.PI * 2 / longi_num;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);
          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;
          sphere_vertices.push(radius * x);
          sphere_vertices.push(radius * y);
          sphere_vertices.push(radius * z);
          if(lo % 3 == 2)
          {
             sphere_colors.push(color[0]);
          sphere_colors.push(color[1]);
          sphere_colors.push(color[2]);
          sphere_colors.push(1.0);
          }
         
          else
          {
             sphere_colors.push(1.0);
          sphere_colors.push(1.0);
          sphere_colors.push(1.0);
          sphere_colors.push(1.0);
          }
        }
      }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_vertices), gl.STATIC_DRAW);
        SphereVertexPositionBuffer.itemSize = 3;
        SphereVertexPositionBuffer.numItems = (lati_num + 1) * (longi_num );


         var sphere_indices = [];
    for (var latNumber = 0; latNumber < lati_num; latNumber++) {
      for (var longNumber = 0; longNumber < longi_num; longNumber++) {
        var first = (latNumber * (longi_num + 1)) + longNumber;
        var second = first + longi_num + 1;
        sphere_indices.push(first);
        sphere_indices.push(second);
        sphere_indices.push(first + 1);

        sphere_indices.push(second);
        sphere_indices.push(second + 1);
        sphere_indices.push(first + 1);
      }
    }

      SphereVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SphereVertexIndexBuffer); 
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere_indices), gl.STATIC_DRAW);  
        SphereVertexIndexBuffer.itemSize = 1;
        SphereVertexIndexBuffer.numItems = 6 * lati_num * longi_num; 

      SphereVertexColorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, SphereVertexColorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere_colors), gl.STATIC_DRAW);
      SphereVertexColorBuffer.itemSize = 4;
      SphereVertexColorBuffer.numItems = (lati_num + 1) * (longi_num + 1);
    }
    function Cube(size,color)
    {
        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        var vertices = [
             0.5,  0.5,  -.5,
      -0.5,  0.5,  -.5, 
      - 0.5, -0.5,  -.5,
      0.5, -0.5,  -.5,
             0.5,  0.5,  .5,
      -0.5,  0.5,  .5, 
            -0.5, -0.5,  .5,
       0.5, -0.5,  .5,      
      
        ];
        for (var i = 0; i < vertices.length; i++)
          vertices[i] *= size;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 8;

  var indices = [0,1,2, 0,2,3, 0,3,7, 0, 7,4, 6,2,3,6,3,7,5,1,2, 5,2,6,5,1,0,5,0,4,5,6,7,5,7,4];
  squareVertexIndexBuffer = gl.createBuffer();  
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
        squareVertexIndexBuffer.itemSize = 1;
        squareVertexIndexBuffer.numItems = 36;  

        squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        var colors = color;
        // var colors = [
        //     1.0, 0.0, 0.0, 1.0,
        //     0.0, 1.0, 0.0, 1.0,
        //     0.0, 0.0, 1.0, 1.0,
        //     1.0, 0.0, 0.0, 1.0,
        //     1.0, 0.0, 0.0, 1.0,
        //     0.0, 1.0, 0.0, 1.0,
        //     0.0, 0.0, 1.0, 1.0,
        //     1.0, 0.0, 0.0, 1.0,     
        // ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 4;
        squareVertexColorBuffer.numItems = 8;

    }
    function initBuffers() {
      var size = 2;
      var colors = [
         0.82, 0.4, 0.12, 1.0,
        0.82, 0.4, 0.12, 1.0,

        0.82, 0.4, 0.12, 1.0,
         0.9, 0.9, 0.98, 1.0,
      0.9, 0.9, 0.98, 1.0,
          0.82, 0.4, 0.12, 1.0,

         0.82, 0.4, 0.12, 1.0,
           0.82, 0.4, 0.12, 1.0,
      ];
     Cube(size, colors);
    // Cylinder(base_radius,top_radius, height, slice_number, stack_number);

    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    var mMatrix1 = mat4.create(), mMatrix2 = mat4.create(), mMatrix3 = mat4.create();
    var mMatrix = mat4.create();  // model matrix
    var vMatrix = mat4.create(); // view matrix
    var pMatrix = mat4.create();  //projection matrix 
    var Z_angle = 0.0;

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	
    }

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

    ///////////////////////////////////////////////////////////////
    function draw_Cube()
    {
          setMatrixUniforms();  
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, squareVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0); 

    }
    function draw_Sphere(color)
    {
        var sphere_radius = 2;
     var lati = 50;
     var longti = 50;
    
     Sphere(sphere_radius, lati, longti, color);
        setMatrixUniforms();  
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 

        gl.bindBuffer(gl.ARRAY_BUFFER, SphereVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, SphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER, SphereVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,SphereVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SphereVertexIndexBuffer);
       //    gl.drawArrays(gl.LINE_LOOP, 0, SphereVertexPositionBuffer.numItems);
        gl.drawElements(gl.TRIANGLES, SphereVertexIndexBuffer.numItems,gl.UNSIGNED_SHORT, 0);
    }
    function draw_Cylinder(num, color)
    {
             setMatrixUniforms();  
                var base_radius = 1;
               var top_radius = 2;
               var height = 3;
               var slice_number = 20;
               var stack_number = 20;
            if(num == 2)
            {
                   base_radius = 1;
                  top_radius = 1;
                  height = 3;
                  slice_number = 20;
                stack_number = 20;
            }
               Cylinder(base_radius,top_radius, height, slice_number, stack_number, color);
                gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexPositionBuffer);
                 gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, CylinderVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);
                gl.bindBuffer(gl.ARRAY_BUFFER,CylinderVertexColorBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, CylinderVertexColorBuffer.itemSize,gl.FLOAT,false,0,0);
               gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,CylinderVertexIndexBuffer);
    
               if(num == 2)
                  gl.drawElements(gl.TRIANGLES, CylinderVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0); 
                if(num == 1)
                   gl.drawArrays(gl.LINE_LOOP, 0, CylinderVertexPositionBuffer.numItems);
     
    }
    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	pMatrix = mat4.perspective(60, 1.0, 0.5, 1000, pMatrix);  // set up the projection matrix 
   
    var sintheta = Math.sin(degToRad(rotate_angle));
    var costheta = Math.cos(degToRad(rotate_angle));
   x_up = x_up * costheta - y_up * sintheta;
   y_up = x_up * sintheta + y_up * costheta;
   console.log("x_up = " + x_up);
   console.log("y_up = " + y_up);
	vMatrix = mat4.lookAt([0 + diffX_camera,0 + diffY_camera,18], [0 + diffX_COI,0 + diffY_COI,0], [x_up,y_up,0], vMatrix);	// set up the view matrix


        mat4.identity(mMatrix);	   
        mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
        mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
        mMatrix = mat4.translate(mMatrix,[0,0,1]);
         mMatrix = mat4.multiply(mMatrix,mMatrix1);
        var color = [0.94, 0.5, 0.5];
        draw_Cylinder(1,color);//top cylinder

        mat4.identity(mMatrix);
        mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
        mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]);   
         mMatrix = mat4.multiply(mMatrix,mMatrix1);
        mMatrix = mat4.translate(mMatrix,[0,-5,1]);
        mMatrix = mat4.scale(mMatrix, [0.1, 2, 0.1]);
         var color = [0.39, 0.58, 0.93];
        draw_Cylinder(2, color);//middle cylinder

      mat4.identity(mMatrix); 
       mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
          mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
           mMatrix = mat4.translate(mMatrix,[0,1,1]);
             mMatrix = mat4.multiply(mMatrix,mMatrix1);
          mMatrix = mat4.scale(mMatrix, [0.4, .4, 0.4]);
          color = [1,0.84,0];  
      draw_Sphere(color);//bubble
       
         mat4.identity(mMatrix); 
          mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
             mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
         mMatrix = mat4.translate(mMatrix,[1,-2,1]);
          mMatrix = mat4.multiply(mMatrix,mMatrix1);
           mMatrix = mat4.scale(mMatrix, [0.05, 1, 0.05]);
         color = [0,1, 0];
          draw_Cylinder(2, color);//switch

      mat4.identity(mMatrix); 
       mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
          mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
         mMatrix = mat4.translate(mMatrix,[1,-2,1]);
          mMatrix = mat4.multiply(mMatrix,mMatrix1);
           mMatrix = mat4.scale(mMatrix, [0.07, 0.07, 0.07]);

    draw_Sphere(color);// small sphere
   mat4.identity(mMatrix); 
    mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
       mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
   mMatrix = mat4.translate(mMatrix,[0,-5,1]);
    mMatrix = mat4.multiply(mMatrix,mMatrix1);
        mMatrix = mat4.scale(mMatrix, [1.5, 0.1, 1.5]);
        
     color = [.75, .75, .75];
    draw_Cylinder(2,color);//base cylinder
      mat4.identity(mMatrix); 
      mMatrix = mat4.scale(mMatrix, [scale,scale, scale]); 
      mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 0, 1]); 
      mMatrix = mat4.translate(mMatrix,[0,-5.5,1]);
      mMatrix = mat4.scale(mMatrix, [3, .5, 3]);
       draw_Cube();
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
            x_up = 0;
            y_up = 1;
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;
          var diffY = mouseY - lastMouseY;
          console.log("event.button " + event.button);
          if(event.button == 0)
              Z_angle = Z_angle + diffX/15;
          if(event.button == 2)
          {

            scale = scale + diffX/1000;
            console.log("scale in mouse =" + scale);
          }

          lastMouseX = mouseX;
          lastMouseY = mouseY;
          //f()
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

    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code03-canvas");

        initGL(canvas);
       
        initShaders();
 canvas.oncontextmenu = function (e) {e.preventDefault();};
	gl.enable(gl.DEPTH_TEST); 

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute)
        shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");	

        initBuffers(); 
        mat4.identity(mMatrix1);
        mat4.identity(mMatrix2);
        mat4.identity(mMatrix3);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        console.log('*****');
       // console.error('nuuuuuuu');
  drawScene();

       document.addEventListener('mousedown', onDocumentMouseDown,
      false); 
       document.addEventListener('keydown', onKeyDown, false);

      
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {
    Z_angle = 0; 
    scale = 1;
    drawScene();
}
    

function Camera(camera)
{
 
  if(camera == 1)
  {
      diffY_camera += 1;
  }
  if(camera == 2)
  {
    diffY_camera -= 1;
  }
  if(camera == 3)
  {
    diffX_camera -= 1;
  }
  if(camera == 4)
  {
    diffX_camera += 1;
  }
  drawScene();
  
}

function COI(coi)
{

  if(coi == 1)
  {
    diffY_COI += 1;

  }
  if(coi == 2)
  {
    diffY_COI -= 1;
    
  }
  if(coi == 3)
  {
    diffX_COI -= 1;
    
  }
  if(coi == 4)
  {
    diffX_COI += 1;
    
  }
  if(coi == 5)
  {
    rotate_angle = 10;
  }
  drawScene();
}

function onKeyDown(event) {
     console.log(event.keyCode);
      switch(event.keyCode)  {
         case 76:
             {

                mMatrix1 = mat4.translate(mMatrix1, [-1, 0, 0]);   
             }
                    
         break;
         case 82:  
           
                mMatrix1 = mat4.translate(mMatrix1, [1, 0, 0]);   
      

         // mMatrix1 = mat4.translate(mMatrix1, [0.1, 0.0, 0]);               
          break;
        case 85:
          
                mMatrix1 = mat4.translate(mMatrix1, [0, 1, 0]);   
         
           break;
           case 68:
           
                mMatrix1 = mat4.translate(mMatrix1, [0, -1, 0]);   
           break;

             case 66:
          
                mMatrix1 = mat4.translate(mMatrix1, [0, 0, -1]);   
         
           break;
           case 70:
           
                mMatrix1 = mat4.translate(mMatrix1, [0, 0, 1]);   
           break;



       }
       drawScene();
    }



