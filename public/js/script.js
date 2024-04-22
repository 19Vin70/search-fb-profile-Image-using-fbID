document.getElementById('fetchButton').addEventListener('click', () => {
    const userId = document.getElementById('userIdInput').value;
    fetch(`/profilePicture?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch profile picture');
            }
            return response.blob(); 
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const profilePicture = document.getElementById('profilePicture');
            profilePicture.src = url; 
            document.getElementById('img').style.display = 'block';
            document.getElementById('downloadButton').addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'xiao_profile.png'; 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url); 
            });
        })
        .catch(error => console.error('Error fetching profile picture:', error));
});
