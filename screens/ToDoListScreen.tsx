import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { initDB, openDatabase } from '../database';

type Task = {
    id: number;
    title: string;
    day: string;
    time: string;
    completed: number;
};

const getFormattedToday = (): string => {
    const now = new Date();

    const weekday = now.toLocaleString('fr-FR', { weekday: 'long' });
    const day = now.getDate();
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();

    return `${weekday} ${day} ${month} ${year}`;
};

export default function ToDoListScreen({ navigation }: any) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [todayFormatted, setTodayFormatted] = useState<string>('');

    useEffect(() => {
        setTodayFormatted(getFormattedToday());

        const loadData = async () => {
            const db = await initDB();
            const results = await db.executeSql('SELECT * FROM tasks;');
            const tasksList: Task[] = [];
            results.forEach(result => {
                for (let i = 0; i < result.rows.length; i++) {
                    tasksList.push(result.rows.item(i));
                }
            });
            setTasks(tasksList);
        };

        loadData();
    }, []);

    const toggleComplete = async (id: number, completed: number) => {
        if (completed === 1) return;

        const db = await openDatabase();
        await db.executeSql(
            `UPDATE tasks SET completed = 1 WHERE id = ?;`,
            [id]
        );

        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: 1 } : task
            )
        );
    };


    const renderItem = ({ item }: { item: Task }) => (
        <View style={styles.taskRow}>
            <Pressable
                style={styles.checkbox}
                onPress={() => toggleComplete(item.id, item.completed)}
                disabled={item.completed === 1}
            >
                <View
                    style={[
                        styles.checkboxInner,
                        item.completed === 1 && styles.checkboxChecked,
                    ]}
                />
            </Pressable>

            <Text
                style={[
                    styles.taskText,
                    item.completed === 1 && styles.taskTextCompleted,
                ]}
            >
                {item.title}
            </Text>

            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{todayFormatted}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('CreateTask')}
                >
                    <Text style={styles.buttonText}>Créer une nouvelle tâche</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('TomorrowTasks')}
                >
                    <Text style={styles.buttonText}>Voir la To-Do de demain</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Archives')}
                >
                    <Text style={styles.buttonText}>Voir les archives</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
    dateContainer: {
        marginTop: 16,
        marginBottom: 8,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    buttonGroup: { marginTop: 16, marginBottom: 8 },
    actionButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
    },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

    listContent: { paddingTop: 12 },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: { width: 12, height: 12 },
    checkboxChecked: { backgroundColor: '#007AFF' },
    taskText: { flex: 1, fontSize: 16, color: '#333' },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    timeText: { fontSize: 14, color: '#666', marginLeft: 8 },
});
