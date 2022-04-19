const nodoTestimonios = document.getElementById('testimonios')
const apiURL = 'https://jsonplaceholder.typicode.com/posts/1/comments'

fetch(apiURL).
    then((res) => res.json()).
    then((json) => {
        showData(json)
    });

function showData(data) {
    data.forEach((element) => {
        let swiperSlide = document.createElement("div");
        swiperSlide.setAttribute("class", "swiper-slide")
        swiperSlide.innerHTML = `  <div class="testimonial-wrap">
        <div class="testimonial-item">
        <img src="assets/img/testimonials/testimonials-${element.id}.jpg" class="testimonial-img" alt="">
          <h3>${element.name}</h3>
          <h4>${element.email}</h4>

          <p>
            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
            ${element.body}
            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
          </p>
        </div>
      </div>`;
        nodoTestimonios.appendChild(swiperSlide);
    })
}