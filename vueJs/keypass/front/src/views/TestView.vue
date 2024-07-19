<template>
    <div id="containt"  @click="clickItem">
        <div>
            <div class="duo">
                <img src="https://github.com/favicon.ico" alt="test">
                <h1>Github</h1>
            </div>
            <div class="duo">
                <div class="duo copy"><img src="./../assets/img/copie.webp" alt="copie" class="copie"><p>Copy le nom d'utilisateur</p></div>
                <div class="duo copy"><img src="./../assets/img/copie.webp" alt="copie" class="copie"><p>Copy le mot de passe</p></div>
            </div>
        </div>
    </div>
    <div v-show="visible">
        <div class="hoverable">
            <p>test</p>
            <img src="./../assets/img/copie.webp" alt="copie" class="copie">
        </div>

        <div class="hoverable">
            <p>test</p>
            <img src="./../assets/img/copie.webp" alt="copie" class="copie">
        </div>

        <div class="hoverable">
            <p>test</p>
            <img src="./../assets/img/copie.webp" alt="copie" class="copie">
        </div>

        <div class="hoverable">
            <p>test</p>
            <img src="./../assets/img/copie.webp" alt="copie" class="copie">
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const visible = ref(false);

        const clickItem = () => {
            visible.value = !visible.value;
        };

        return {
            visible,
            clickItem
        };
    }
};
</script>

<style scoped>
img {
    height: 50px;
}
#containt {
    width: 30%;
    display: flex;
    align-items: center;
    background-color: #4d4d4d4f;
    border: solid;
    border-radius: 20px;
    transition: background-color 0.3s, border-color 0.3s;
}

.duo {
    display: flex;
}

#containt:hover {
    background-color: #1b1a1a4f;
    border-color: rgb(114, 75, 75);
    cursor: pointer;
}

.copy:hover {
    background-color: #3e5f214f;
    border-radius: 20px;
}
</style>
