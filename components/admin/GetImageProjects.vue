<template>
    <div>
        <div v-if="update === false">
            <div
                v-for="(projectImage, index) in sortProjectItem"
                :key="projectImage._id"
                class="card-image"
            >
                <div v-if="projectImage.type !== 'duo'" class="image">
                    <img :src="projectImage.file1" :alt="projectImage.file1" />
                </div>
                <div v-if="projectImage.type === 'duo'" class="images_duo">
                    <div class="image1">
                        <img
                            :src="projectImage.file1"
                            :alt="projectImage.file1"
                        />
                    </div>
                    <div class="image2">
                        <img
                            :src="projectImage.file2"
                            :alt="projectImage.file2"
                        />
                    </div>
                </div>
                <div class="change_index">
                    <v-btn
                        v-if="index !== 0"
                        icon
                        fab
                        small
                        @click="topOrBottom('isTop', projectImage._id)"
                    >
                        <v-icon>
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>

                    {{ index + 1 }}
                    <v-btn
                        v-if="index !== sortProjectItem.length - 1"
                        icon
                        fab
                        small
                        @click="topOrBottom('isBottom', projectImage._id)"
                    >
                        <v-icon>
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </div>
                <div class="actions">
                    <v-btn
                        class="darken2"
                        @click="
                            updateOneItem(projectImage._id, projectImage.type)
                        "
                    >
                        <v-icon icon>
                            mdi-pen
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="error"
                        @click="deleteOneItem(projectImage._id)"
                    >
                        <v-icon icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <UpdateImageProject
            v-if="update === true"
            :id="id"
            :update="update"
            :type="typeUpdate"
            @closeUpdate="update = $event"
        />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import UpdateImageProject from './UpdateImageProject'
export default {
    components: {
        UpdateImageProject
    },
    async fetch() {
        await this.$store.dispatch('projetImage/fetchProjectsItem', {
            titre: this.$route.params.id.replace(/-/g, ' ')
        })
    },
    data() {
        return {
            update: false,
            id: '',
            i: 0,
            type: '',
            typeUpdate: ''
        }
    },
    computed: {
        ...mapGetters({
            projectItem: 'projetImage/projectItem'
        }),
        sortProjectItem() {
            const yo = this.projectItem
            return yo.sort((v1, v2) => v1.placement - v2.placement)
        },

        titrePage() {
            return this.$route.params.id
        }
    },
    methods: {
        topOrBottom(topOrBottom, id) {
            let titreWithSpace = this.titrePage.replace(/-/g, ' ')
            this.$store.dispatch('projetImage/updatePlacement', {
                arg1: id,
                arg2: topOrBottom,
                arg3: titreWithSpace
            })
        },
        goTo(page) {
            $nuxt._router.push(`${page}`)
        },
        updateOneItem(id, type) {
            this.id = id
            this.update = true
            this.typeUpdate = type
        },
        deleteOneItem(id) {
            let titreWithSpace = this.titrePage.replace(/-/g, ' ')
            Swal.fire({
                title: 'Supprimer le projet',
                text: 'Es tu sur?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00BFA5',
                cancelButtonColor: '#c84224',
                confirmButtonText: 'Oui!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch('projetImage/deleteProjectItem', {
                        arg1: id,
                        arg2: titreWithSpace
                    })
                    Swal.fire('Supprimé!', 'success')
                }
            })
        }
    }
}
</script>
