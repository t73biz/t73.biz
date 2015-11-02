/**
 * Matrix Directive
 * This directive will give a matrix code like background. Based on code from http://neilcarpenter.com/demos/canvas/matrix/
 * @author Ronald Chaplin <rchaplin@t73.biz>
 * @author Neil Carpenter
 */
(function(){
	angular.module('matrix', [])
		.directive('matrix',
			function () {
				return {
					restrict: 'C',
					scope: {},
					link: function (scope, element, attrs) {
						var c = element.get(0);
						var ctx = c.getContext("2d");

						//making the canvas full screen
						c.height = attrs.height;
						c.width = attrs.width;

						//codeText characters - taken from the unicode charset
						var codeText = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
						//converting the string into an array of single characters
						codeText = codeText.split("");

						var font_size = 10;
						var columns = c.width/font_size; //number of columns for the rain
						//an array of drops - one per column
						var drops = [];
						//x below is the x coordinate
						//1 = y co-ordinate of the drop(same for every drop initially)
						for(var x = 0; x < columns; x++)
							drops[x] = 1; 

						//drawing the characters
						function draw()
						{
							//Black BG for the canvas
							//translucent BG to show trail
							ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
							ctx.fillRect(0, 0, c.width, c.height);
							
							ctx.fillStyle = "#0F3"; //green text
							ctx.font = font_size + "px arial";
							//looping over drops
							for(var i = 0; i < drops.length; i++)
							{
								//a random codeText character to print
								var text = codeText[Math.floor(Math.random()*codeText.length)];
								//x = i*font_size, y = value of drops[i]*font_size
								ctx.fillText(text, i*font_size, drops[i]*font_size);
								
								//sending the drop back to the top randomly after it has crossed the screen
								//adding a randomness to the reset to make the drops scattered on the Y axis
								if(drops[i]*font_size > c.height && Math.random() > 0.975)
									drops[i] = 0;
								
								//incrementing Y coordinate
								drops[i]++;
							}
						}

						setInterval(draw, 33);




					}
				};
			

			}
		);
})();			
