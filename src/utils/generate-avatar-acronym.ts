export const generateAvatarAcronym = (name?: string) => {
	if (name) {
		const fullName = name.split(' ') ?? ''
		const firstNameInitial = fullName.shift()?.charAt(0)
		const lastNameInitial = fullName.pop()?.charAt(0)
		const initials = `${firstNameInitial ?? ''}${lastNameInitial ?? ''}`
		return initials.toUpperCase()
	} else {
		return 'AA'
	}
}
