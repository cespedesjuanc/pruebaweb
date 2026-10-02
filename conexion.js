/**
 * conexion.js - Configuración e inicialización del cliente de Supabase
 */

// Credenciales del proyecto Supabase
const SUPABASE_URL = 'https://plustdhhsxrezgikkwzn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_woeEPjL619DvM9jnCrEfdQ_RbrHwo9C';

let dbClient = null;

function obtenerClienteSupabase() {
    if (!dbClient) {
        if (typeof supabase === 'undefined' || !supabase.createClient) {
            console.error('La librería de Supabase aún no ha cargado.');
            return null;
        }
        dbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return dbClient;
}

// Exportar objeto de conexión global
window.supabaseClient = {
    get: obtenerClienteSupabase,
    url: SUPABASE_URL,
    key: SUPABASE_KEY
};