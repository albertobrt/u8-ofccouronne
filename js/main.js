// script.js - Identique à la version précédente (sans score)
const matchsEffectues = [
    { date: "06/09/2025", adversaire: "Plateau U8 (interne)", competition: "Amical", lieu: "Domicile (Maryse Hilsz)", status: "termine" },
    { date: "13/09/2025", adversaire: "SO Rosny", competition: "Amical", lieu: "Extérieur", status: "termine" },
    { date: "20/09/2025", adversaire: "Championnet", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "27/09/2025", adversaire: "Étoile de Bobigny", competition: "Amical", lieu: "Extérieur", status: "termine" },
    { date: "04/10/2025", adversaire: "Olympique de Pantin", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "11/10/2025", adversaire: "Plateau U8 (Paris Alésia)", competition: "Amical", lieu: "Extérieur (Paris Alésia)", status: "termine" },
    { date: "18/10/2025", adversaire: "ES16", competition: "Amical", lieu: "Domicile", status: "annule" },
    { date: "25/10/2025", adversaire: "AS Bondy", competition: "Amical", lieu: "Extérieur", status: "termine" },
    { date: "08/11/2025", adversaire: "Espérance 19", competition: "Amical", lieu: "Extérieur", status: "termine" },
    { date: "15/11/2025", adversaire: "Saint Mandé", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "22/11/2025", adversaire: "Olympique de Pantin", competition: "Amical", lieu: "Extérieur", status: "termine" },
    { date: "29/11/2025", adversaire: "Atletico Bagnolet", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "06/12/2025", adversaire: "Paris 13 Atletico", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "13/12/2025", adversaire: "Paris SC", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "20/12/2025", adversaire: "US Fontenay", competition: "Amical", lieu: "Domicile", status: "termine" },
    { date: "10/01/2026", adversaire: "Entre nous U8", competition: "Amical", lieu: "Domicile", status: "a-venir" },
    { date: "17/01/2026", adversaire: "ES Parisienne", competition: "Amical", lieu: "Domicile", status: "a-venir" },
    { date: "24/01/2026", adversaire: "Bussy", competition: "Amical", lieu: "Domicile", status: "a-venir" },
    { date: "31/01/2026", adversaire: "CO Vincennes", competition: "Amical", lieu: "Domicile", status: "a-venir" },
    { date: "07/02/2026", adversaire: "Maison Alfort", competition: "Amical", lieu: "Extérieur", status: "a-venir" },
    { date: "14/02/2026", adversaire: "Entre nous U8", competition: "Amical", lieu: "Domicile", status: "a-venir" },
    { date: "21/02/2026", adversaire: "Paris 13 Atletico", competition: "Amical", lieu: "Extérieur", status: "a-venir" }
];

const themesEntrainement = [
    {
        mois: "SEPTEMBRE 2025",
        sousTitre: "Maîtrise de balle individuelle",
        technique: "Conduite de balle et dribble",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "OCTOBRE 2025",
        sousTitre: "Maîtrise de balle collective",
        technique: "Passe et contrôle",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "NOVEMBRE 2025",
        sousTitre: "Maîtrise de balle individuelle",
        technique: "Conduite de balle et tir",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "DÉCEMBRE 2025",
        sousTitre: "Maîtrise de balle collective",
        technique: "Passe et contrôle",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "JANVIER 2026",
        sousTitre: "Maîtrise de balle individuelle",
        technique: "Dribble et tir",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "FÉVRIER 2026",
        sousTitre: "Maîtrise de balle individuelle",
        technique: "Jeu de tête, jeu de volée",
        physique: "Souplesse, vitesse",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "MARS 2026",
        sousTitre: "On a le ballon",
        technique: "Contrôle, passe, conduite",
        principe: "Conservation et progression",
        physique: "Souplesse, vitesse, coordination motrice",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "AVRIL 2026",
        sousTitre: "On a le ballon",
        technique: "Dribble, combinaison, finition",
        principe: "Déséquilibrer et finir",
        physique: "Vitesse, souplesse",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    },
    {
        mois: "MAI 2026",
        sousTitre: "Période de tournois",
        theme: "Jeu libre · Préparation tournois",
        horaire: "Mercredi & Vendredi 18h05-19h15"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const matchsBody = document.getElementById('matchs-body');
    
    matchsEffectues.forEach(m => {
        const row = document.createElement('tr');
        
        let statusClass = 'termine';
        if (m.status === 'a-venir') statusClass = 'a-venir';
        if (m.status === 'annule') statusClass = 'annule';
        
        let statusIcon = 'fa-check-circle';
        if (m.status === 'a-venir') statusIcon = 'fa-clock';
        if (m.status === 'annule') statusIcon = 'fa-times-circle';
        
        let statusText = 'Terminé';
        if (m.status === 'a-venir') statusText = 'À venir';
        if (m.status === 'annule') statusText = 'Annulé';
        
        row.innerHTML = `
            <td>${m.date}</td>
            <td><strong>${m.adversaire}</strong></td>
            <td>${m.competition}</td>
            <td>${m.lieu}</td>
            <td><span class="status ${statusClass}"><i class="fas ${statusIcon}"></i> ${statusText}</span></td>
        `;
        matchsBody.appendChild(row);
    });
    
    const themesContainer = document.getElementById('themes-container');
    
    themesEntrainement.forEach(t => {
        const themeDiv = document.createElement('div');
        themeDiv.className = 'theme-item';
        
        let description = '';
        
        if (t.mois === "MAI 2026") {
            description = `<p class="theme-desc"><i class="fas fa-trophy gold-text"></i> ${t.theme}</p>`;
        } else {
            description = `
                <p class="theme-desc"><strong>Technique :</strong> ${t.technique}</p>
                <p class="theme-desc"><strong>Physique :</strong> ${t.physique}</p>
                ${t.principe ? `<p class="theme-desc"><strong>Principe :</strong> ${t.principe}</p>` : ''}
            `;
        }
        
        themeDiv.innerHTML = `
            <div class="theme-month">${t.mois}</div>
            <div class="theme-subtitle">${t.sousTitre}</div>
            ${description}
            <div class="theme-category"><i class="fas fa-clock"></i> ${t.horaire}</div>
        `;
        
        themesContainer.appendChild(themeDiv);
    });
});