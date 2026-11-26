import {managedAvatarBucket, mountProfilePhoto, readAvatarReferences, renderAvatar, saveProfilePhoto} from './profile-photo-editor.js';

export {renderAvatar};
const legacyBucket = 'gary-visa-avatars';
const bucket = managedAvatarBucket('visa');

export async function readVisaAvatarReferences(db, ids) {
  const references = await readAvatarReferences(db, 'visa', ids);
  return new Map(ids.map(id => {
    const reference = references.get(id);
    // A null path on an existing row is a removal. Only untouched accounts
    // may fall back to the old fixed-path object.
    return [id, reference ? {...reference, bucket} : {version: null, path: `${id}/avatar`, bucket: legacyBucket}];
  }));
}

export function createProfileAvatar({db, doc, t, name, notify, onPhotoChange}) {
  let picture = '';
  function paint() {
    for (const id of ['user-avatar', 'profile-avatar']) renderAvatar(doc.getElementById(id), name(), picture);
  }
  const editor = mountProfilePhoto({
    root: doc.getElementById('profile-avatar-controls'), t, notify,
    async read(id) {
      const reference = (await readVisaAvatarReferences(db, [id])).get(id);
      if (!reference.path) return reference;
      const {data} = await db.storage.from(reference.bucket).download(reference.path);
      return {...reference, path: data || reference.version ? reference.path : null, blob: data};
    },
    savePhoto: (owner, version, body) => saveProfilePhoto(db, 'visa', owner, version, body, {ownerHeader: 'x-visa-avatar-owner'}),
    onPhotoChange(url) { picture = url; paint(); onPhotoChange?.(url); },
  });
  return {...editor, render() { editor.render(); paint(); }};
}
