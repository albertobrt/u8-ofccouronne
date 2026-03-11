// newsletter.js - Formulaire sécurisé OFCC

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');
    
    // Générer un token de session unique
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    document.getElementById('sessionToken').value = sessionToken;
    
    // Timestamp actuel
    document.getElementById('timestamp').value = Date.now();
    
    // Vérifier les horaires (10h-22h)
    function checkHours() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = dimanche, 6 = samedi
        
        // Dimanche = pas d'envoi
        if (day === 0) {
            return { allowed: false, message: "Les inscriptions sont fermées le dimanche. Réessayez du lundi au samedi entre 10h et 22h." };
        }
        
        // Hors horaires
        if (hour < 10 || hour >= 22) {
            return { allowed: false, message: "Les inscriptions sont ouvertes de 10h à 22h (lundi-samedi). Réessayez plus tard." };
        }
        
        return { allowed: true };
    }
    
    // Validation email avec regex
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Anti-spam : vérifier que le champ honeypot est vide
    function checkHoneypot() {
        const website = document.getElementById('website').value;
        return website === '';
    }
    
    // Anti-rejeu : vérifier que le timestamp est récent (moins de 5 minutes)
    function checkTimestamp() {
        const timestamp = parseInt(document.getElementById('timestamp').value);
        const now = Date.now();
        const diff = now - timestamp;
        
        // Si le formulaire a été soumis il y a plus de 5 minutes ou dans le futur
        if (diff > 300000 || diff < 0) {
            return false;
        }
        return true;
    }
    
    // Limiter le nombre de soumissions par IP (via localStorage)
    function checkSubmissionLimit() {
        const today = new Date().toDateString();
        const submissions = JSON.parse(localStorage.getItem('newsletter_submissions') || '{}');
        
        if (submissions[today] && submissions[today] >= 3) {
            return { allowed: false, message: "Limite de 3 inscriptions par jour atteinte. Réessayez demain." };
        }
        
        return { allowed: true };
    }
    
    // Enregistrer une soumission
    function recordSubmission() {
        const today = new Date().toDateString();
        const submissions = JSON.parse(localStorage.getItem('newsletter_submissions') || '{}');
        
        submissions[today] = (submissions[today] || 0) + 1;
        localStorage.setItem('newsletter_submissions', JSON.stringify(submissions));
    }
    
    // Simuler l'envoi d'email (dans la vraie vie, appel API)
    function sendEmail(data) {
        return new Promise((resolve) => {
            // Simuler un délai réseau
            setTimeout(() => {
                console.log('Email envoyé à :', data.email);
                console.log('Données :', data);
                
                // Ici, tu pourrais appeler une API comme EmailJS, Formspree, etc.
                // Exemple avec EmailJS (service tiers) :
                // emailjs.send('service_id', 'template_id', {
                //     to_email: data.email,
                //     type: data.type,
                //     to_name: 'OFCC'
                // });
                
                resolve({ success: true });
            }, 1000);
        });
    }
    
    // Gestion de la soumission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription en cours...';
        
        // Masquer les anciens messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        
        // 1. Vérifier les horaires
        const hourCheck = checkHours();
        if (!hourCheck.allowed) {
            errorText.textContent = hourCheck.message;
            errorMessage.style.display = 'block';
            resetButton();
            return;
        }
        
        // 2. Vérifier le honeypot
        if (!checkHoneypot()) {
            // Si le champ caché est rempli, c'est un bot - on fait semblant que ça marche
            successMessage.style.display = 'block';
            form.reset();
            resetButton();
            return;
        }
        
        // 3. Valider l'email
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            errorText.textContent = "Veuillez entrer une adresse email valide.";
            errorMessage.style.display = 'block';
            resetButton();
            return;
        }
        
        // 4. Vérifier le timestamp
        if (!checkTimestamp()) {
            errorText.textContent = "Formulaire expiré. Veuillez réessayer.";
            errorMessage.style.display = 'block';
            resetButton();
            return;
        }
        
        // 5. Vérifier la limite de soumissions
        const limitCheck = checkSubmissionLimit();
        if (!limitCheck.allowed) {
            errorText.textContent = limitCheck.message;
            errorMessage.style.display = 'block';
            resetButton();
            return;
        }
        
        // 6. Vérifier que l'email n'est pas déjà inscrit (simulé)
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (subscribers.includes(email)) {
            errorText.textContent = "Cet email est déjà inscrit à la newsletter.";
            errorMessage.style.display = 'block';
            resetButton();
            return;
        }
        
        // 7. Tout est bon, on envoie
        try {
            const formData = {
                email: email,
                type: document.getElementById('type').value,
                rgpd: document.getElementById('rgpd').checked,
                date: new Date().toISOString(),
                sessionToken: sessionToken
            };
            
            // Simuler l'envoi
            const result = await sendEmail(formData);
            
            if (result.success) {
                // Enregistrer l'email dans la liste
                subscribers.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
                
                // Enregistrer la soumission
                recordSubmission();
                
                // Afficher le succès
                successMessage.style.display = 'block';
                form.reset();
                
                // Rediriger après 3 secondes
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            }
        } catch (error) {
            errorText.textContent = "Une erreur technique est survenue. Veuillez réessayer plus tard.";
            errorMessage.style.display = 'block';
            resetButton();
        }
    });
    
    function resetButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> S\'inscrire à la newsletter';
    }
});