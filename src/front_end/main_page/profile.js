function loadProfileData() {

    fetch('http://localhost:3000/main/api')
        .then(response => response.json())
        .then(data => {

            const imgTag = document.querySelector('.navbar-nav .nav-item img');
            imgTag.src = data.login_user.user_img;
            imgTag.classList.add('user-avatar');


            

            // Show the modal when the button is clicked
            imgTag.addEventListener('click', function () {
                const userModal = document.getElementById('userModal');
                userModal.style.display = 'block';
            });

            const userModal = document.getElementById('userModal');


            window.addEventListener('click', (event) => {
                if (!userModal.contains(event.target) && event.target !== imgTag) {
                    userModal.style.display = 'none';
                }
            });
        })
        .catch(error => console.error('Error fetching user data:', error));

}

loadProfileData()