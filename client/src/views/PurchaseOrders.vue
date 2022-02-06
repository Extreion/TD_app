<template>
    <v-container>
        <v-card
        elevation="5"
        class="mx-auto pa-12"
        align="center"
        max-width="1600px"
        style="overflow-wrap: normal"
        >
            <v-card-title> Search by </v-card-title>
                <v-chip-group
                    class="mx-6"
                    v-model="filter"
                    active-class="indigo--text text--accent-4 font-weight-bold"
                >
                    <v-chip
                    v-for="tag in tags"
                    :key="tag"
                    
                    >
                        {{ tag }}
                    </v-chip>
                </v-chip-group>
            {{filter}}
            <v-form>
                <v-select
                    v-model="project"
                    :items="projects"
                    menu-props="auto"
                    label="Project"
                    prepend-icon="mdi-home-modern"
                    
                ></v-select>
            </v-form>
        </v-card>
        <v-card
            elevation="5"
            class="mx-auto pa-12 ma-6"
            align="center"
            max-width="1600px"
            style="overflow-wrap: normal"
        >
            <v-card-title> P.Os for {{project}} </v-card-title>
            <template>
                <v-expansion-panels>
                    <v-expansion-panel
                    v-for="(PO,i) in POs"
                    :key="i"
                    >
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                            <v-col cols="4">
                                <strong>{{PO.number}}</strong> 
                            </v-col>
                            <v-col cols="4">
                                Number of items: {{PO.items.length}}
                            </v-col>
                            <v-col cols="4">
                                Date: {{PO.date}}
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
        projects: ['TD Stock', 'Witley Park', 'Caxton', 'Buxmead House', 'Eaton Square, 36D'],
        POs:[
            {number: "TD16017", items: [{item:"item1"}, {item:"item2"}, {item:"item3"}, {item:"item4"}, {item:"item5"}], date: "06/02/2022"},
            {number: "TD16018", items: [{item:"item1"}, {item:"item2"}, {item:"item3"}], date: "06/02/2022"},
            {number: "TD16019", items: [{item:"item1"}, {item:"item2"} ], date: "07/02/2022"},
            {number: "TD16020", items: [{item:"item1"}, {item:"item2"}, {item:"item3"}], date: "07/02/2022"},
            {number: "TD16021", items: [{item:"item1"}, {item:"item2"}], date: "07/02/2022"}

        ],
        filter: '',
        tags: ['Project', 'PO number', 'item reference', 'Pending POs'],
        project: 'Witley Park',
        loginData: {},
        errors: [],
        messageVisibility: false,
        message: ''
        };
    },
}
</script>