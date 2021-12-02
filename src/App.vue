<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="Logo" class="shrink mr-2" contain src="https://cdn.discordapp.com/attachments/667756214867722260/915300183653384223/logo_brisket.png" transition="scale-transition" width="100" />

        </div>

        <v-spacer></v-spacer>
    </v-app-bar>

    <v-main centered>
      <v-col
      centered
              class="d-flex"
        cols="12"
        sm="6">

      <v-select
        v-model="request.select"
        dense
        single-line
        :items="items"
      ></v-select>
      <v-text-field
        single-line
        dense   
        clearable
        label="Recherche..."
        hide-details="auto"
      ></v-text-field>
      </v-col>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        items: ['Title', 'Actor'],
        request: {
          select: "Title",
          search: ""
        },
    }),
};
</script>
