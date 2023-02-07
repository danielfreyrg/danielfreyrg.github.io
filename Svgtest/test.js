
document.getElementById('middle').addEventListener('click', function() {
	// document.getElementById('building2-checkbox').checked = !document.getElementById('building2-checkbox').checked;
	document.getElementById('building2-checkbox').click();
	document.getElementById('left-div').classList.remove('open-left');
	document.getElementById('middle-div').classList.toggle('open');
})

document.getElementById('left').addEventListener('click', function() {
	// document.getElementById('building1-checkbox').checked = !document.getElementById('building1-checkbox').checked;
	document.getElementById('building1-checkbox').click();
	document.getElementById('middle-div').classList.remove('open');
	document.getElementById('left-div').classList.toggle('open-left');
})
document.getElementById('right').addEventListener('click', function() {
	document.getElementById('middle-div').classList.remove('open');
	document.getElementById('left-div').classList.remove('open-left');
	// document.getElementById('building3-checkbox').checked = !document.getElementById('building3-checkbox').checked;
document.getElementById('building3-checkbox').click();

})
document.getElementById('building1').addEventListener('click', function() {
	document.getElementById('middle-div').classList.remove('open');
	document.getElementById('left-div').classList.toggle('open-left');
})
document.getElementById('building2').addEventListener('click', function() {
	document.getElementById('middle-div').classList.toggle('open');
	document.getElementById('left-div').classList.remove('open-left');
})
document.getElementById('building3').addEventListener('click', function() {
	document.getElementById('middle-div').classList.remove('open');
	document.getElementById('left-div').classList.remove('open-left');
})
document.getElementById('left').addEventListener('mouseover', function() {

	document.getElementById('building1').classList.add('hover')
})
document.getElementById('left').addEventListener('mouseout', function() {

	document.getElementById('building1').classList.remove('hover')
})
document.getElementById('middle').addEventListener('mouseover', function() {

	document.getElementById('building2').classList.add('hover')


})
document.getElementById('middle').addEventListener('mouseout', function() {

	document.getElementById('building2').classList.remove('hover')

})

document.getElementById('right').addEventListener('mouseover', function() {

	document.getElementById('building3').classList.add('hover')
})
document.getElementById('right').addEventListener('mouseout', function() {

	document.getElementById('building3').classList.remove('hover')
	

})

document.getElementById('building1').addEventListener('mouseover', function() {

	document.getElementById('left').classList.add('buildinghover')
})
document.getElementById('building1').addEventListener('mouseout', function() {

	document.getElementById('left').classList.remove('buildinghover')
}
)
document.getElementById('building2').addEventListener('mouseover', function() {

	document.getElementById('middle').classList.add('buildinghover')
}
)	
document.getElementById('building2').addEventListener('mouseout', function() {

	document.getElementById('middle').classList.remove('buildinghover')
}
)
document.getElementById('building3').addEventListener('mouseover', function() {

	document.getElementById('right').classList.add('buildinghover')
}
)
document.getElementById('building3').addEventListener('mouseout', function() {

	document.getElementById('right').classList.remove('buildinghover')
}
)

document.getElementById('building1-checkbox').addEventListener('change', function() {
	document.getElementById('building1').classList.toggle('checked')
	document.getElementById('building2').classList.remove('checked')
	document.getElementById('building3').classList.remove('checked')
}
)
document.getElementById('building2-checkbox').addEventListener('change', function() {
	document.getElementById('building2').classList.toggle('checked')
	document.getElementById('building1').classList.remove('checked')
	document.getElementById('building3').classList.remove('checked')
}
)
document.getElementById('building3-checkbox').addEventListener('change', function() {
	document.getElementById('building3').classList.toggle('checked')
	document.getElementById('building1').classList.remove('checked')
	document.getElementById('building2').classList.remove('checked')
}
)
