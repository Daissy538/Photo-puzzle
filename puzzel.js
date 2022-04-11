var img = './schildpad.jpg';
var width = 700;
var height = 500;

var heigtOnePiece = height / 5;
var widthOnePiece = width / 5;

var tegels = new Array(5);

window.onload = function(){    
    createImage();
}

function createImage(){
    var doneImage = new Image(width, height);
    doneImage.src = img;
    
    doneImage.onload = function(){
        for(var x = 0; x < 5 ; x++){
            tegels[x] = new Array(5);
            for(var y = 0; y < 5; y++){
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
            
                canvas.width = widthOnePiece;
                canvas.height = heigtOnePiece;

                ctx.drawImage(doneImage, width*x, height*y, width, height, 0, 0, canvas.width, canvas.height);

                const item = document.createElement('div'); 
                item.classList.add('grid-item');

                if(x != 0 || y != 0){
                    item.appendChild(canvas);
                }               

                var piece = {
                    element: item,
                    isEmptyPeace: x == 0 && y == 0
                };
                
                tegels[x][y] = piece;
            }
        }

        mixImages();        

        for(var x = 0; x < tegels.length; x++){
            for(var y = 0; y < tegels.length; y++){
                tegels[x][y].element.indexX= x;
                tegels[x][y].element.indexY= y;

                document.getElementById('puzzle').appendChild(tegels[x][y].element)
                tegels[x][y].element.onclick = function(event){
                    for(var i = -1; i <= 1; i+=2){
                        
                        try {
                            var test = tegels[this.indexX-i][this.indexY].isEmptyPeace;
                            if(test){
                                console.log(tegels[this.indexX][this.indexY].element.firstElementChild);
                                tegels[this.indexX-i][this.indexY].element.appendChild(tegels[this.indexX][this.indexY].element.firstElementChild);
                                tegels[this.indexX-i][this.indexY].isEmptyPeace = false

                                tegels[this.indexX][this.indexY].element.removeChild(tegels[this.indexX][this.indexY].element.firstElementChild);
                                tegels[this.indexX][this.indexY].isEmptyPeace = true;
                                break;
                            }
                        } catch (error) {
                            console.error(error);
                        }

                        try {
                            var test = tegels[this.indexX][this.indexY-i].isEmptyPeace;
                            if(test){
                                console.log(tegels[this.indexX][this.indexY].element.firstElementChild);
                                tegels[this.indexX][this.indexY-i].element.appendChild(tegels[this.indexX][this.indexY].element);
                                tegels[this.indexX][this.indexY-i].isEmptyPeace = false
                        
                                tegels[this.indexX][this.indexY].element.removeChild(tegels[this.indexX][this.indexY].element.firstElementChild);
                                console.log(this);
                                tegels[this.indexX][this.indexY].isEmptyPeace = true;
                                break;
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }

                }
            }
        }
        
    };
}

function mixImages(){
    for(var x = 1; x < tegels.length; x++){
        for(var y = 1; y < tegels.length; y++){
            const newIndexX = Math.floor(Math.random() * ((tegels.length-1) - x) + x); 
            const newIndexY = Math.floor(Math.random() * ((tegels.length-1) - y) + y); 
        
            const currentvalue = tegels[x][y];
            tegels[x][y] = tegels[newIndexX][newIndexY];
            tegels[newIndexX][newIndexY] = currentvalue;
        }
    }
}