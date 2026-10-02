/**
 * consultas.js - Operaciones de consulta y registro en Supabase
 */

/**
 * Consulta y devuelve los registros almacenados en la tabla logs_terminal
 */
async function obtenerLogsTerminal() {
    const db = window.supabaseClient.get();
    if (!db) {
        return { data: null, error: 'Cliente de base de datos no inicializado.' };
    }

    try {
        const { data, error } = await db
            .from('logs_terminal')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error al consultar logs:', error.message);
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err) {
        console.error('Excepción al consultar Supabase:', err);
        return { data: null, error: err.message };
    }
}

/**
 * Inserta un nuevo log de comando ejecutado en la base de datos
 */
async function guardarLogTerminal(comando, resultado, usuario = 'OPERATOR') {
    const db = window.supabaseClient.get();
    if (!db) return null;

    try {
        const { data, error } = await db
            .from('logs_terminal')
            .insert([
                { comando: comando, resultado: resultado, usuario: usuario }
            ])
            .select();

        if (error) {
            console.error('Error al guardar log:', error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Error en la inserción:', err);
        return null;
    }
}

// Funciones globales
window.obtenerLogsTerminal = obtenerLogsTerminal;
window.guardarLogTerminal = guardarLogTerminal;