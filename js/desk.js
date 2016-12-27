define(['Lyf','function'],function($,fn){
	return {
		init:function(){
			/*require(['smallDate'],function(smallDate){
				smallDate.init();
			});
			$('.icon-item')[3].onclick = function(){
				 require(['calendar'],function(calendar){
				 calendar.init();
				 });
			 };*/
			require(['music'],function(music){
				music.init();
			});
		}
	};
});

