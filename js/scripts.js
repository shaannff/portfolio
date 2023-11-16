/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

let submitState=true;
let message;
const formCheck=(e)=>{
    if(e.target.id==="cname"){
        let regex=/\d/;
        submitState=regex.test(e.target.value)?false:true;
        message="ERROR: Name cannot contains digits";
        
    }
    if(e.target.id==="cemail"){
        if(e.target.value!=''){
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        submitState=regex.test(e.target.value);
        message="ERROR: Invalid email address";
        }
    }
    if(!submitState){
        let error=document.getElementById('error');
        error.style.display='block';
        error.innerHTML=message;
    }
}

$("#submit-form").submit((e) => {
    e.preventDefault()
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzXimaKOUUQO0W2lxkskUC9ViXrNZNUBfu302qCb3NyeNfICFP6ck4fVCvsHhXm6cPK/exec",
        data: $("#submit-form").serialize(),
        method: "post",
        success: function (response) {
            alert("Form submitted successfully")
            window.location.reload()
            // window.location.href="https://docs.google.com/spreadsheets/d/1rxxzH-I3U4RP4Lvefud-OhPoSLbTQILTBhJZWxVIgE0/edit?usp=sharing"
        },
        error: function (err) {
            alert("Something Error")

        }
    })
})