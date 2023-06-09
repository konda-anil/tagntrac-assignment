export enum FormValidationRule {
  Required,
}

export const Validators = {
  mobile(mobile: string) {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!mobile || !mobile.trim()) return "Mobile number can't be empty.";
    if (!re.test(mobile)) return 'Mobile number is invalid.';
    return '';
  },
  username(name: string) {
    if (!name || !name.trim()) return "Name can't be empty.";
    return '';
  },
  password(password: string) {
    if (!password || !password.trim()) return "Password can't be empty.";
    return '';
  },
  gender(gender: string) {
    if (!gender || !gender.trim()) return "Gender can't be empty.";
    return '';
  },
  typeOfUser(typeOfUser: string) {
    if (!typeOfUser || !typeOfUser.trim()) return "User Type can't be empty.";
    return '';
  },
  email(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) return "Email can't be empty.";
    if (!re.test(email)) return 'Email is invalid.';
    return '';
  },
};
