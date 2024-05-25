@extends('layouts.herder')

<link rel="stylesheet" type="text/css" href="{{ asset('/style/welcone/welcone-style.css') }}">

@section('title', 'Motos')

@section('content')   
<section>
    <div class="slide-container">
            <div class="custom-slider fade">
                <div class="slide-index">1 / 2</div>
                <img class="slide-img" src="{{ asset('/picture/resto/image1.avif') }}">
                <div class="slide-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
            <div class="custom-slider fade">
                <div class="slide-index">2 / 2</div>
                <img class="slide-img" src="{{ asset('/picture/resto/image2.jpg') }}">
                <div class="slide-text">Nullam luctus aliquam ornare. </div>
            </div>
            <a class="prev" onclick="plusSlides(-1)">❮</a>
            <a class="next" onclick="plusSlides(1)">❯</a>
        </div>
        <br>
        <div class="slide-dot">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
        </div>
    
</section>
@endsection


<script>
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("custom-slider");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }
</script>