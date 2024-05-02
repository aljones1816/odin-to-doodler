export function group(groupName) {
  groupName;

  function getGroupName() {
    return groupName;
  }

  function setGroupName(newGroupName) {
    groupName = newGroupName;
  }

  return {
    getGroupName,
    setGroupName,
  };
}
