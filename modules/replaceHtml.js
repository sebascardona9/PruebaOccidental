module.exports = function(template, user){
    let output = template.replace('{{%NAME%}}', user.name);
    output = output.replace('{{%EMAIL%}}', user.email);
    output = output.replace('{{%REGISTEREDAT%}}', user.registeredAt);


    return output;
}