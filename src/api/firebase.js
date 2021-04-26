import firebase from 'firebase'

export async function onAuth(func) {

  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      func(user);
      resolve();
    });
  })
}

export async function login({ id, password }) {
  return await firebase.auth().signInWithEmailAndPassword(id, password);
}

export async function logout() {
  return await firebase.auth().signOut();
}

export async function fetchOrganizationsByCode({ organizationCode }) {
  const organization = await firebase.firestore().collection('organizations').where('code', '==', organizationCode).get();
  return organization.docs[0].data();
}

export async function fetchOrganizationsByName({ organizationName }) {
  const tmpOrganizations = await firebase.firestore().collection('organizations').orderBy("name").startAt(organizationName).endAt(organizationName + '\uf8ff').get();
  const organizations = [];
  tmpOrganizations.docs.forEach(doc => { organizations.push(doc.data()) });
  return organizations;
}

export async function realtimeFetchMembersInfo({ id, updateFunc }) {
  const myInfo = await firebase.firestore().collection('users').where('id', '==', id).get();
  const organizationCode = myInfo.docs[0].data().organization;
  const datas = firebase.firestore().collection('users').where('organization', '==', organizationCode);
  datas.onSnapshot(querySnapShot => {
    let usersInfo = [];
    querySnapShot.docs.forEach(doc => { usersInfo.push(doc.data()) });
    updateFunc(usersInfo);
  })
  const tmpUsersInfo = await datas.get();
  let usersInfo = [];
  tmpUsersInfo.docs.forEach(doc => { usersInfo.push(doc.data()) });
  return usersInfo;
}

export async function updateMyInfo({ id, newInfo }) {
  const docId = (
    await firebase.firestore()
      .collection("users")
      .where("id", "==", id)
      .get()
  ).docs[0].id;
  return firebase.firestore().collection("users")
    .doc(docId)
    .update(newInfo);
}

export async function fetchOrganization({ organizationCode }) {
  const organizationInfo = await firebase.firestore().collection('organizations').where('code', '==', organizationCode).get();
  return organizationInfo.docs[0].data().name;
}

export async function realtimeFetchChatInfo({ organizationCode, updateFunc }) {
  const datas = firebase.firestore().collection('chat').where('organization', '==', organizationCode);
  datas.onSnapshot(querySnapShot => {
    const updateData = querySnapShot.docs[0].data().chats;
    updateFunc(updateData);
  })
  const chatInfo = await datas.get();
  return chatInfo.docs[0].data().chats;
}

export async function addChatMessage({ organization, user, message }) {
  const docId = (
    await firebase.firestore()
      .collection("chat")
      .where("organization", "==", organization)
      .get()
  ).docs[0].id;
  await firebase.firestore().collection('chat').doc(docId).update({
    chats: firebase.firestore.FieldValue.arrayUnion({user, message, date: firebase.firestore.Timestamp.now()})
  })
}

export async function fetchRequest({ organizationCode }) {
  const request = await firebase.firestore().collection('request').where('organization', '==', organizationCode).get();
  return request.docs[0].data().request;
}