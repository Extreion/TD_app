<template>
    <v-container>
        <v-card
        elevation="5"
        class="mx-auto pa-12"
        align="center"
        max-width="800"
        style="overflow-wrap: normal"
        >
            <v-card-title class="justify-center"> Sign In </v-card-title>

            <v-form>
                <v-text-field
                    label="Item ID"
                    prepend-icon="mdi-database"
                >
                </v-text-field>
                <v-text-field
                    label="Signed in by"
                    readonly
                    value="Alastair Arnold"
                    prepend-icon="mdi-account"
                >
                </v-text-field>
                <v-select
                    :items="projects"
                    menu-props="auto"
                    label="Allocate to"
                    prepend-icon="mdi-home-modern"
                    
                ></v-select>
                <v-text-field
                    class="mt-6"
                    label="Date of sign in"
                    value="06/02/2022"
                    prepend-icon="mdi-calendar"
                >
                </v-text-field>
                <v-btn type="submit" color="grey darken-3" class="white--text"> Sign In </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
        projects: ['TD Stock', 'Witley Park', 'Caxton', 'Buxmead House', 'Eaton Square, 36D'],
        loginData: {},
        errors: [],
        messageVisibility: false,
        message: ''
        };
    },
}
</script>