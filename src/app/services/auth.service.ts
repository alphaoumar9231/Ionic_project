import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { addDoc, collection, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(
      private auth: Auth
     ) {
     }




 
// La fonction d'inscription
  async registre({email,password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email , password);
      return user ;
    }
    catch (e) {
      return null;
    }
  }

  // ==== la fonction de connexion 
  async login({email,password}) {
    try {
      const user = signInWithEmailAndPassword(this.auth, email , password);
      sessionStorage.setItem('Auth email:', email)
      return user;
    } catch (e) {
      return null;
    }
  }

  // ==== La fonction qui permet d'ajouter les données de l'utilisateur
  async ajouter({nom,prenom,email}){
    const elmt ={
      nom : nom,
      prenom : prenom,
      email : email,
    };
    const user = addDoc(collection(this.db,email),elmt)
    return user ;
   }
 

  // ==== La fonction qui permet d'ajouter les  produits

  db = getFirestore();
  async addPrd({categorie,nom,quantite,date}){
      const elmt ={
        categorie : categorie,
        nom : nom,
        quantite : quantite,
        date : date  
      };
      const produit = addDoc(collection(this.db,"produit"),elmt)
      return produit ;
  }
  
  // L==== La fonctiond de deconnexion 
  logout (){
    return signOut(this.auth);
  }
}
