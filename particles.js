var ParticleEngine = (function() {
	var canvas, ctx;
	var particles = []
	var numParticles = 100;
	
	var radius;
	//var angle = Math.random() * Math.PI * 2;
	var angle;
	var dx, dy;
	
	var mouse = {};
	
	function setUpCanvas() {
		canvas = document.getElementById('feild');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		if (canvas.getContext) {
			ctx = canvas.getContext('2d');
		}
	}
	
	function Particle() {
	
		this.x = radius * Math.cos(angle) + (canvas.width / 2);
		this.y = radius * Math.sin(angle) + (canvas.height / 2);
		
		this.vx = -15 + Math.random() * 30;
		this.vy = -15 + Math.random() * 30;
		
		this.life = 10 + Math.random() * 20;
		this.remainingLife = this.life;
		
		this.radius = 10 + Math.random() * 20;
		
		this.r = Math.round(Math.random() * 255);
		this.g = Math.round(Math.random() * 255);
		this.b = Math.round(Math.random() * 255);
		this.opacity = 0;
	}
	
	function createParticles(number) {
		for (var i = 0; i < number; ++i) {
			particles[i] = new Particle();
		}
	}
	
	function trackMouse(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	
	function run() {
		dx = mouse.x - (canvas.width / 2);
		dy = mouse.y - (canvas.height / 2);
		
		angle = Math.atan2(dy, dx);
		console.log(angle);
	
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = 'lighter';
		
		ctx.beginPath();
		ctx.strokeStyle = '#fff';
		ctx.arc(canvas.width / 2, canvas.height / 2, radius, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		
		
		for (var i = 0; i < particles.length; ++i) {
			var p = particles[i]
			
			ctx.beginPath();
			
			p.opacity = Math.round(p.remainingLife / p.life * 100) / 100;
			
			
			ctx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b +',' + p.opacity + ')';
			ctx.arc(p.x, p.y, p.radius, Math.PI * 2, false);
			ctx.fill();
			
			p.remainingLife--;
			p.radius -= 0.5;
			
			p.x += p.vx;
			p.y += p.vy;
			
			if (p.remainingLife < 0 || p.radius < 0) {
				particles[i] = new Particle();
			}
		}
		
		setTimeout(run, 30);
	}
	
	return {
		init: function() 
		{
			setUpCanvas();
			radius =  (Math.min(canvas.width, canvas.height) / 2) - 50;
			canvas.addEventListener('mousemove', trackMouse, false);
			createParticles(numParticles);
			run();
		}
	};
})()

window.addEventListener('load', ParticleEngine.init, false);