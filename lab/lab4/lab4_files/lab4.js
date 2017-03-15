
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



 // set up the parameters for lighting 
  var light_ambient = [0,0,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,0,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 1, 0, 1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 
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
    var CylinderVertexNormalBuffer;
    var CylinderVertexColorBuffer;
    var CylinderVertexIndexBuffer;

    var SphereVertexPositionBuffer;
    var SphereVertexIndexBuffer;
    var SphereVertexColorBuffer;



   ////////////////    Initialize VBO  ////////////////////////

    function Cylinder(radius,height, slice_number, stack_number)
    {
        var cylinder_vertices = [];
        var cylinder_colors = [];
        var cylinder_indices = [];
        var cylinder_normals  = [];
           for(var stack = 0; stack <= stack_number; stack++)
          {
            for(var slice = 0; slice <= slice_number; slice++)
            {
              var Theta = slice * Math.PI * 2 / slice_number;
              var sinTheta = Math.sin(Theta);
              var cosTheta = Math.cos(Theta);

                cylinder_normals.push(cosTheta);
                cylinder_normals.push(sinTheta);
                cylinder_normals.push(0.0);

                var h = stack * height / stack_number;
                var x = cosTheta * radius;
                var z = sinTheta * radius;
                var y = h;
                cylinder_vertices.push(x);
                cylinder_vertices.push(y);
                cylinder_vertices.push(z);
                    
                cylinder_colors.push(1.0);
                cylinder_colors.push(1.0);
                cylinder_colors.push(0.0);
                cylinder_colors.push(1.0);
          }
        }
         CylinderVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinder_vertices),gl.STATIC_DRAW);
        CylinderVertexPositionBuffer.itemSize = 3;
        CylinderVertexPositionBuffer.numItems = (slice_number + 1) * (stack_number + 1);

          CylinderVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinder_normals), gl.STATIC_DRAW);
        CylinderVertexNormalBuffer.itemSize = 3;
        CylinderVertexNormalBuffer.numItems =(slice_number + 1) * (stack_number + 1);



        CylinderVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinder_colors), gl.STATIC_DRAW);
        CylinderVertexColorBuffer.itemSize = 4;
        CylinderVertexColorBuffer.numItems = cylinder_colors / 4;
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
      // var size = 2;
      // var colors = [
      //  1.0, 1.0, 0.0, 1.0,
      //   1.0, 1.0, 0.0, 1.0,
      //    1.0, 1.0, 0.0, 1.0,
      //   1.0, 1.0, 0.0, 1.0,
      //    1.0, 1.0, 0.0, 1.0,
      //   1.0, 1.0, 0.0, 1.0,
      //    1.0, 1.0, 0.0, 1.0,
      //   1.0, 1.0, 0.0, 1.0,

      // ];
     //Cube(size, colors);
     //var slice_number = 20, stack_number = 20;
     Cylinder(1.0, 1.0, 20, 20);

    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    var mMatrix1 = mat4.create(), mMatrix2 = mat4.create(), mMatrix3 = mat4.create();
    var mMatrix = mat4.create();  // model matrix
    var vMatrix = mat4.create(); // view matrix
    var pMatrix = mat4.create();  //projection matrix 
    var nMatrix = mat4.create();  // normal matrix
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
    function drawScene() {

             Cylinder(1.0, 1.0, 20, 20);
         gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  pMatrix = mat4.perspective(60, 1.0, 0.1, 100, pMatrix);  // set up the projection matrix 

  vMatrix = mat4.lookAt([3,0,5], [0,0,0], [0,1,0], vMatrix);  // set up the view matrix, multiply into the modelview matrix

        mat4.identity(mMatrix); 
  
//        console.log('Z angle = '+ Z_angle); 
        mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [0, 1, 1]);   // now set up the model matrix


  mat4.identity(nMatrix); 
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);  
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix); 

        shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");


  gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], light_pos[3]);  
  gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0); 
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0); 
  gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0); 
  gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]); 

  gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
  gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
  gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 


        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, CylinderVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, CylinderVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, CylinderVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,CylinderVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
  

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CylinderVertexIndexBuffer);  

       setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 

  //if (draw_type ==1) 
    gl.drawArrays(gl.LINE_STRIP, 0, CylinderVertexPositionBuffer.numItems); 
    //    else if (draw_type ==0) gl.drawArrays(gl.POINTS, 0, CylinderVertexPositionBuffer.numItems);
 // else if (draw_type==2) 
   // gl.drawElements(gl.TRIANGLES, CylinderVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  
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

          shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");	
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");  


            shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
        shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef"); 
        shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
        shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
        shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");

        shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient"); 
        shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
        shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular"); 

       // mat4.identity(mMatrix1);
        //mat4.identity(mMatrix2);
        //mat4.identity(mMatrix3);

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



