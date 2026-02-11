# 🚀 Guide d'Utilisation Rapide - Site ANTA

## Démarrage Rapide

### 1. Ouvrir le Site
- Double-cliquez sur `index.html` pour ouvrir la page d'accueil
- Le site fonctionne directement dans votre navigateur

### 2. Navigation
- **Accueil** : Page principale avec présentation
- **À Propos** : Informations sur l'académie
- **Programmes** : Détails des formations
- **Galerie** : Photos et images
- **Contact** : Formulaire de contact

## 📝 Inscription

### Pour les Étudiants (8-17 ans)
1. Cliquez sur "S'inscrire" ou "Commencer l'Aventure"
2. Sélectionnez "Étudiant / Apprenant"
3. Remplissez le formulaire avec:
   - Informations personnelles
   - Informations du parent/tuteur
   - Choix du programme
4. Créez un mot de passe
5. Acceptez les conditions
6. Cliquez sur "S'inscrire"

### Pour les Volontaires
1. Cliquez sur "Devenir Volontaire" ou "S'inscrire"
2. Sélectionnez "Volontaire / Instructeur"
3. Remplissez le formulaire avec:
   - Informations personnelles
   - Compétences et expérience
   - Motivation
4. Créez un mot de passe
5. Acceptez les conditions
6. Cliquez sur "S'inscrire comme Volontaire"

## 🔐 Connexion

1. Cliquez sur "Connexion" dans le menu
2. Entrez votre email et mot de passe
3. Cliquez sur "Se connecter"

**Note**: Pour tester, créez d'abord un compte via la page d'inscription

## 📊 Tableau de Bord Utilisateur

Après connexion, vous accédez à:

### Menu Principal
- **Tableau de Bord**: Vue d'ensemble
- **Mes Formations**: Formations en cours et terminées
- **Paiements**: Effectuer des paiements
- **Certificats**: Télécharger vos certificats
- **Factures**: Historique des factures

### Fonctionnalités
- Voir la progression des formations
- Consulter les prochaines sessions
- Télécharger les certificats
- Gérer les paiements

## 👨‍💼 Espace Administrateur

Pour accéder en tant qu'admin:
1. Créez un compte utilisateur normal
2. Dans le navigateur, ouvrez la console (F12)
3. Modifiez le type d'utilisateur:
```javascript
let users = JSON.parse(localStorage.getItem('users'));
users[0].type = 'admin'; // Premier utilisateur devient admin
localStorage.setItem('users', JSON.stringify(users));
```
4. Reconnectez-vous

### Fonctionnalités Admin
- **Dashboard**: Statistiques globales
- **Utilisateurs**: Gérer tous les utilisateurs
- **Publications**: Créer des articles
- **Annonces**: Gérer les pop-ups d'annonces
- **Formations**: Créer et gérer les formations
- **Certificats**: Générer et gérer les certificats
- **Paiements**: Suivi des paiements

## 💡 Conseils d'Utilisation

### Pop-up d'Annonce
- Apparaît automatiquement à chaque visite
- Cliquez sur la croix pour fermer
- Géré par l'administrateur

### Données de Test
Le site utilise le localStorage du navigateur pour stocker les données.
Pour réinitialiser:
1. Ouvrez la console (F12)
2. Tapez: `localStorage.clear()`
3. Rechargez la page

### Navigation Mobile
- Menu hamburger en haut à droite sur mobile
- Bouton flottant pour accéder au menu sur le dashboard

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/style.css`:
```css
:root {
    --primary-orange: #FF6B35;
    --primary-blue: #004E89;
    --primary-green: #00D9A3;
}
```

### Logo
Remplacez le texte "ANTA" dans la navigation par votre logo:
```html
<img src="images/logo.png" alt="ANTA Logo">
```

### Contenus
Modifiez directement les textes dans les fichiers HTML

## 📱 Fonctionnalités du Site

### ✅ Pages Publiques
- [x] Landing page attractive
- [x] Présentation de l'académie
- [x] Liste des programmes
- [x] Galerie photos (à compléter)
- [x] Formulaire de contact (à compléter)

### ✅ Authentification
- [x] Inscription étudiant
- [x] Inscription volontaire
- [x] Connexion
- [x] Déconnexion

### ✅ Espace Utilisateur
- [x] Dashboard avec statistiques
- [x] Suivi des formations
- [x] Gestion des paiements (interface)
- [x] Téléchargement certificats (interface)
- [x] Historique factures (interface)

### ✅ Espace Admin
- [x] Dashboard administrateur
- [x] Gestion utilisateurs
- [x] Création d'annonces
- [x] Gestion des formations (interface)

### 🔄 À Développer (Backend)
- [ ] API REST pour les données
- [ ] Base de données réelle
- [ ] Système de paiement en ligne
- [ ] Génération PDF des certificats
- [ ] Envoi d'emails automatiques
- [ ] Upload d'images pour la galerie

## 🐛 Résolution de Problèmes

### Le site ne charge pas
- Vérifiez que tous les fichiers sont dans le bon dossier
- Assurez-vous d'avoir une connexion internet (pour Bootstrap, Fonts)

### Impossible de se connecter
- Créez d'abord un compte via l'inscription
- Vérifiez email et mot de passe
- Essayez de vider le cache du navigateur

### Les données disparaissent
- Normal : le site utilise localStorage (données locales)
- Pour un site en production, il faut un backend avec base de données

### Erreur "Cannot read property"
- Ouvrez la console (F12)
- Notez l'erreur exacte
- Vérifiez que tous les fichiers JS sont chargés

## 📞 Support

Pour toute question:
- **Email**: contact@funtech.pro
- **Téléphone**: +229 90 89 24 36
- **Site**: www.funtech.pro

## 🎓 Prochaines Étapes

Pour mettre le site en production:
1. Créer un backend (Node.js, PHP, Python)
2. Configurer une base de données
3. Intégrer un système de paiement réel
4. Configurer l'envoi d'emails
5. Ajouter les vraies photos dans la galerie
6. Optimiser pour le SEO
7. Déployer sur un serveur web

---

**Bon apprentissage avec ANTA ! 🚀**
