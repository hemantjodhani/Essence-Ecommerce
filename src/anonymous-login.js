import {
    getFirestore, collection,
    addDoc
} from 'firebase/firestore';

const get_user_id = async function() {
    const db = getFirestore();
    const colRef = collection(db, 'Users');
    var user_id = localStorage.getItem('user_id');

    if ( user_id ) {
        return user_id;
    }
    const data = [
        {
        },
    ];

    const ref = await addDoc(colRef, { dataArray: data });

    user_id = ref.id;
    localStorage.setItem('user_id', user_id);

    return user_id;
}

export default get_user_id;