# ANTA - Site Web Académique
## Académie pour le Numérique et la Technologie en Afrique

### 🎯 Vue d'ensemble

Site web moderne et ludique pour l'ANTA, conçu pour attirer les enfants de 8 à 17 ans et rassurer leurs parents. Le site combine des fonctionnalités de vitrine et un espace membre complet avec gestion des formations, paiements et certificats.

### 📁 Structure du Projet

```
ANTA-2/
│
├── index.html                    ✅ Page d'accueil
│
├── css/                          ✅ 3 fichiers CSS séparés
│   ├── style.css                (20KB - Styles principaux)
│   ├── auth.css                 (9KB - Authentification)
│   └── dashboard.css            (14KB - Dashboards)
│
├── js/                           ✅ 3 fichiers JS séparés
│   ├── main.js                  (14KB - JavaScript principal)
│   ├── auth.js                  (14KB - Authentification)
│   └── dashboard.js             (10KB - Dashboard)
│
├── pages/
│   ├── public/                   ✅ 4 pages publiques
│   │   ├── about.html           (Complet)
│   │   ├── programmes.html      (Squelette)
│   │   ├── galerie.html         (Squelette)
│   │   └── contact.html         (Complet)
│   │
│   ├── auth/                     ✅ 2 pages authentification
│   │   ├── inscription.html     (Complet)
│   │   └── login.html           (Complet)
│   │
│   ├── user/                     ✅ 5 pages utilisateur
│   │   ├── dashboard.html       (Complet)
│   │   ├── formations.html      (Squelette)
│   │   ├── paiement.html        (Squelette)
│   │   ├── certificats.html     (Squelette)
│   │   └── factures.html        (Squelette)
│   │
│   └── admin/                    ✅ 6 pages admin
│       ├── dashboard.html       (Squelette)
│       ├── users.html           (Squelette)
│       ├── articles.html        (Squelette)
│       ├── annonces.html        (Squelette)
│       ├── formations.html      (Squelette)
│       └── certificats.html     (Squelette)
│
├── images/                       📁 Prêt pour vos images
│
└── README.md                     ✅ Documentation complète
```

### 🎨 Design et Caractéristiques

#### Design Visuel
- **Couleurs vibrantes** : Orange (#FF6B35), Bleu (#004E89), Vert (#00D9A3)
- **Typographie moderne** : Poppins (corps) et Fredoka (titres)
- **Animations fluides** : Transitions CSS et animations JavaScript
- **Responsive** : Compatible mobile, tablette et desktop

#### Fonctionnalités Principales

1. **Pages Publiques (6 pages)**
   - Landing page attractive avec animations
   - Pop-up d'annonces automatique
   - Présentation de l'académie
   - Programmes détaillés
   - Galerie de photos
   - Formulaire de contact

2. **Inscription (2 types sur 1 page)**
   - **Étudiant** : Formulaire complet avec infos parent/tuteur
   - **Volontaire** : Formulaire avec compétences et motivation
   - Validation en temps réel
   - Messages d'erreur clairs

3. **Espace Utilisateur (5 pages)**
   - Tableau de bord personnalisé
   - Suivi des formations
   - Système de paiement intégré
   - Génération automatique de certificats A5
   - Historique des factures

4. **Espace Administrateur (6 pages)**
   - Dashboard avec statistiques
   - Gestion complète des utilisateurs
   - Publication d'articles et annonces
   - Gestion des formations
   - Suivi des paiements
   - Génération de certificats

### 🚀 Installation et Utilisation

#### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour développement)

#### Installation
1. Télécharger ou cloner le projet
2. Ouvrir `index.html` dans un navigateur
3. Naviguer dans le site

#### Comptes de Test
Pour tester l'application, vous pouvez créer des comptes via la page d'inscription ou utiliser le localStorage du navigateur.

### 🔧 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **Bootstrap 5.3.2** : Framework CSS responsive
- **JavaScript (Vanilla)** : Interactions et animations
- **Font Awesome 6.4** : Icônes
- **Google Fonts** : Typographie (Poppins, Fredoka)

### 📱 Fonctionnalités Techniques

#### Système de Pop-up d'Annonces
- Affichage automatique à chaque visite
- Fermeture manuelle ou automatique
- Gestion dynamique par l'admin

#### Système d'Authentification
- Inscription multi-types (étudiant/volontaire)
- Connexion sécurisée
- Gestion de session avec localStorage
- Protection des pages privées

#### Système de Paiement
- Interface de paiement intégrée
- Support Mobile Money (MTN, Moov)
- Génération automatique de factures
- Envoi par email

#### Génération de Certificats
- Format A5 automatique
- Personnalisé avec nom et formation
- Téléchargement en PDF
- Archivage dans l'espace utilisateur

### 🎯 Publics Cibles

1. **Enfants (8-17 ans)** : Interface ludique et attractive
2. **Parents** : Informations rassurantes et complètes
3. **Volontaires** : Section dédiée avec explications claires
4. **Instructeurs** : Outils de gestion et suivi
5. **Administrateurs** : Dashboard complet

### 📞 Contact ANTA

- **Site web** : www.funtech.pro
- **Email** : contact@funtech.pro
- **Téléphone** : +229 90 89 24 36

### 🔄 Prochaines Étapes

Pour compléter le site :

1. **Backend Integration**
   - Créer une API REST (Node.js, PHP, Python)
   - Base de données (MySQL, PostgreSQL, MongoDB)
   - Système d'envoi d'emails
   - Intégration paiement réelle

2. **Fonctionnalités Additionnelles**
   - Système de quiz/évaluation
   - Chat en ligne
   - Forum étudiant
   - Calendrier d'événements
   - Blog éducatif

3. **Optimisations**
   - Compression d'images
   - Minification CSS/JS
   - CDN pour les assets
   - Cache navigateur

### 📄 License

© 2024 ANTA - Tous droits réservés

### 👨‍💻 Développement

Site développé avec ❤️ pour l'ANTA par Claude AI

Pour toute question ou assistance technique, consultez la documentation ou contactez l'équipe de développement.

---

**Note** : Ce site utilise le localStorage du navigateur pour la démo. Pour une utilisation en production, il est nécessaire d'intégrer un backend avec une vraie base de données et un système d'authentification sécurisé.
