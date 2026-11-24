export function isConflictResponse(error) {
  return ['PT409', '409'].includes(String(error?.code))
    || Number(error?.status) === 409
    || ['CMS_VERSION_CONFLICT', 'AGENCY_ROLE_CONFLICT', 'AGENCY_TRASH_CHANGED'].includes(error?.message);
}

export function responseError({error, status}) {
  if (status === 409 && error && !isConflictResponse(error)) {
    return Object.assign(new Error(error.message), error, {status});
  }
  return error;
}
