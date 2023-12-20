interface Icon {
	name: string,
	icon: string,
}

class IconifyProvider {

	static getIconSet(): Icon[] {
		return [
			{ name: 'Person', icon: 'person-standing' },
			{ name: 'Target', icon: 'locate-fixed' },
			{ name: 'Anchor', icon: 'anchor' },
			{ name: 'Swords', icon: 'swords' },
			{ name: 'Map Pin', icon: 'map-pin' },
			{ name: 'Map', icon: 'map' },
			{ name: 'Sign Post', icon: 'signpost-big' },
			{ name: 'Document', icon: 'file-text' },
			{ name: 'Church', icon: 'church' },
			{ name: 'Building', icon: 'building-2' },
			{ name: 'Castle', icon: 'castle' },
			{ name: 'Ship Wheel', icon: 'ship-wheel' },
			{ name: 'Rabbit', icon: 'rabbit' },
			{ name: 'Book', icon: 'book-marked' },
			{ name: 'Skull', icon: 'skull' },
			{ name: 'Door', icon: 'door-open' },
			{ name: 'Trees', icon: 'trees' },
			{ name: 'Factory', icon: 'factory' },
		];
	}

}

export { IconifyProvider };
export type { Icon };