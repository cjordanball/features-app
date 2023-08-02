import { StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from '@/constants/colors';

interface ButtonProps {
	onPress: () => void;
	children: React.ReactNode;
}

const Button = ({ onPress, children }: ButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		elevation: 2,
		shadowColor: 'black',
		shadowOpacity: 0.15,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 2,
		borderRadius: 4,
		backgroundColor: Colors.primary800,
	},
	pressed: {
		opacity: 0.5,
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		color: Colors.primary50,
	},
});
