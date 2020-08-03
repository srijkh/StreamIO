
document.querySelectorAll('.list_el').forEach(item => {
    item.addEventListener('click', e => {

        location.href = '#section_1';

        const link = e.target.id;
        const name = JSON.stringify(e.target.innerHTML);

        var video = document.getElementById('player');

        if (video.dataset.id == "nan") {
            var source = document.createElement('source');
            source.setAttribute('src', link);
            source.setAttribute('id', 'vid_src');
            video.appendChild(source);
            // console.log(video);
            video.dataset.id = "none";

            document.querySelector('.section_1').classList.remove('hide');
            document.querySelector('.section_3').classList.add('background-dark');
            document.querySelector('.section_3').classList.remove('background-white');
            document.querySelector('.box').classList.remove('background-white');

        }
        else {
            // source.removeAttribute('src');
            // console.log(video.childNodes);

            var source = document.getElementById('vid_src');
            source.setAttribute('src', link);
            // console.log(video);
        }


        document.querySelector('.movie_name').innerHTML = name.slice(1, name.lastIndexOf('.'));
        document.querySelector('.listing').innerHTML = "See Whats Next !!";
        // video.play();

        setTimeout(function () {
            video.pause();

            source.setAttribute('src', link);

            video.load();
            // video.play();
        }, 10);

    })
}); 