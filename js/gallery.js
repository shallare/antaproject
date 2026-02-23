document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.btn-filter');
    const items = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalMediaContainer = document.querySelector('.modal-content-wrapper');
    const modalClose = document.querySelector('.modal-close');
    const modalCaption = document.querySelector('.modal-caption');

    // Filtering
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filters.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    item.style.display = 'block';
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                    setTimeout(() => {
                        if (item.classList.contains('hide')) {
                            item.style.display = 'none';
                        }
                    }, 300); // Wait for transition if needed, though display:none breaks transition
                    item.style.display = 'none'; // Immediate hide for simplicity
                }
            });
        });
    });

    // Lightbox / Modal
    items.forEach(item => {
        item.addEventListener('click', () => {
            const mediaType = item.getAttribute('data-type'); // 'image' or 'video'
            const src = item.getAttribute('data-src');
            const caption = item.querySelector('.gallery-overlay h4').textContent;

            modalMediaContainer.innerHTML = ''; // Clear previous

            if (mediaType === 'video') {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                video.classList.add('modal-media');
                modalMediaContainer.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.classList.add('modal-media');
                modalMediaContainer.appendChild(img);
            }

            modalCaption.textContent = caption;
            modal.style.display = 'flex';
        });
    });

    // Close Modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        modalMediaContainer.innerHTML = ''; // Stop video
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalMediaContainer.innerHTML = '';
        }
    });
});
