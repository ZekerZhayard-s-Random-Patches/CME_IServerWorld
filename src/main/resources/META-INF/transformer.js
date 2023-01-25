
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
var TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");

function initializeCoreMod() {
    return {
        "Entity_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/entity/Entity",
                "methodName": "<init>",
                "methodDesc": "(Lnet/minecraft/entity/EntityType;Lnet/minecraft/world/World;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/entity/Entity") && node.name.equals(ASMAPI.mapField("field_184244_h")) && node.desc.equals("Ljava/util/List;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new TypeInsnNode(Opcodes.NEW, "io/github/zekerzhayard/cme_iserverworld/CopyOnWriteArrayListWithMutableIterator"));
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.DUP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESPECIAL, "io/github/zekerzhayard/cme_iserverworld/CopyOnWriteArrayListWithMutableIterator", "<init>", "()V", false));
                    }
                }
                return mn;
            }
        }
    }
}